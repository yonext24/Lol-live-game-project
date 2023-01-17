import { useEffect, useState } from 'react' 
import { getFetch } from '../services/getFetch'
import { protocol, region, endpoints } from '../assets/endPoints.json'

export function useLeagueData (id) {
  const [leagueData, setData] = useState({
    loading: false,
    data: {},
    error: null,
  });

  const url = `${protocol}${region[1]}${endpoints.league}${id}?api_key=${import.meta.env.VITE_API_KEY}`

  useEffect(() => {
    if (!id) return;

    setData({loading: true, data: {}, error: null});
    getLeagueData(url);

  }, [id])  

  const getLeagueData = async url =>{
    try {
      let data = await getFetch(url);

      setData({
        loading: false,
        data,
        error: null 
      });
  
    } catch (error) {
      setData({
        loading: false,
        data: {},
        error
      });
    }
  }

  return { leagueData }

}