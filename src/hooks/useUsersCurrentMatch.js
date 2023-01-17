import { useEffect, useState } from 'react'
import { protocol, region, endpoints, staticUrl } from '../assets/endPoints.json'
import { getFetch } from '../services/getFetch'
import { useGetUserData } from './useGetUserData'
import rawChampionsData from '../assets/champions.json'


export function useUsersCurrentMatch(rawName) {
  const [matchData, setMatchData] = useState({
    data: {},
    loading: false,
    error: null,
  })

  // I need to fetch the user username in order to get the userId to make the activeGame fetch
  const name = rawName.substring(5, rawName.length)
  const { userData } = useGetUserData(decodeURI(name))

  useEffect(() => {
    if (userData.error) {
      setMatchData({
        data: {},
        loading: false,
        error: userData.error
      })
    }
  }, [userData.error])


  useEffect(() => {
    if (!userData.data.id || userData.error) return

    const activeGameUrl = `${protocol}${region[1]}${endpoints.activeGame}${userData.data.id}?api_key=${import.meta.env.VITE_API_KEY}`

    setMatchData({
      data: {},
      loading: true,
      error: null,
    })

    const getMatchChampions = async () => {

      const data = await getFetch(activeGameUrl)
      const singleChampDataUrl = staticUrl.specificChamp

      try {

        const getMatchData = async () => {
          const arrayOfAllChamps = Object.entries(rawChampionsData.data)

          // I need to get the champions data this way because the activeGame endpoint only gives me the championId and later i'll need the full champion name
          // im doing it with a promise because it could take a little of time
          const rawMatchData = await new Promise(resolve => {

            const champions = data.participants.map(({ championId, summonerId, summonerName, teamId }) => {

              const match = arrayOfAllChamps.find(([_, currentChamp]) => {

                return championId === parseInt(currentChamp.key) ? true : false

              })
              return { userData: { name: summonerName, id: summonerId, teamId }, championData: match[1] }
            })
            const sortedChampions = champions.sort( (a, b) => {
              return a.userData.teamId < b.userData.teamId ? -1 : 1
            })
            resolve(sortedChampions)
          })

          return rawMatchData
        }

        const rawMatchData = await getMatchData()

        // now im getting the full champion data (with habilities) wich is conceeded by a certain endpoint
        const promises = rawMatchData.map(async ({ championData, userData }) => {

          const data = await new Promise(res => {
            getFetch(`${singleChampDataUrl}${championData.id}.json`)
              .then(data => res(data))
              .catch(err => setMatchData({
                data: {},
                loading: false,
                error: err
              }))
          })

          return { userData, championData: Object.entries(data.data)[0][1] }

        })

        Promise.all(promises)
          .then(data => {
            const team1 = data.slice(0,5)
            const team2 = data.slice(5,10)

            setMatchData({
            data: {team1, team2},
            loading: false,
            error: null
          })
        })


      } catch {
        setMatchData({
          data: {},
          loading: false,
          error: new Error('Something went wrong')
        })
      }

    }

    getMatchChampions()


  }, [userData])

  return { matchData }

}