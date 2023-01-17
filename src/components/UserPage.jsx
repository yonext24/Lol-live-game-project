import React from 'react'
import { Buscador } from './Buscador'
import UserData from './UserData'
import { LeagueData } from './LeagueData'
import ChampionsData from './ChampionsData'
import './styles/userpage.css'
import { useGetUserData } from '../hooks/useGetUserData'
import { useLeagueData } from '../hooks/useLeagueData'
import useChampsData from '../hooks/useChampsData'
import { useLocation } from 'wouter'

export default function UserPage() {
  const [location] = useLocation()

  const { userData } = useGetUserData(location)
  const { leagueData } = useLeagueData(userData.data.id);
  const { champsData } = useChampsData(userData.data.id);

  return (
    <>
      <Buscador/>
      <div className='data_container'>

        {
          (userData.loading || leagueData.loading || champsData.loading || !userData) && <div className='loading'>
            <div className='spinner'></div>
          </div>
        }

        <div className='userdata_container'>
          {
            userData.data.id
              ? <UserData data={userData.data} />
              : <div></div>
          }
          {
            !leagueData.data[0]
              ? <div></div>
              : <LeagueData data={leagueData.data} />
          }
        </div>
        <div className='championsdata_container'>
          {
            champsData.data[0]
              ? champsData.data.map(champ => {
                return <ChampionsData key={champ.name} data={champ} />
              })
              : <div></div>
          }
        </div>
      </div>
    </>
  )
}