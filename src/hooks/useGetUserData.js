import { useEffect, useState } from "react";
import { protocol, region, endpoints } from '../assets/endPoints.json'
import { getFetch } from "../services/getFetch";


export function useGetUserData(rawName) {
  const [userData, setData] = useState({
    data: {},
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!rawName) return
    const name = rawName.substring(1,rawName.length)

    const getUserData = async name => {

      const url = `${protocol}${region[1]}${endpoints.summoner}${name}?api_key=${import.meta.env.VITE_API_KEY}`

      try {
        let data = await getFetch(url);

        setData({
          loading: false,
          data: {
            id: data.id,
            name: data.name,
            level: data.summonerLevel,
            profileIcon: `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/${data.profileIconId}.png`,
          },
          error: null
        });

      } catch (error) {
        setData({ loading: false, data: {}, error: error })
      }
    }

    getUserData(name)

  }, [rawName])

  return {userData}

}