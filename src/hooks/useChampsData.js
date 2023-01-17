import { useEffect, useState } from 'react' 
import { getFetch } from '../services/getFetch'
import { protocol, region, endpoints } from '../assets/endPoints.json'
import allChampionsData from '../assets/champions.json'

export default function useChampsData (id) {

  const [champsData, setData] = useState({
    loading: false,
    data: {},
    error: null,
  })

  const championsData = Object.entries(allChampionsData.data);
  const url = `${protocol}${region[1]}${endpoints.championMastery}${id}?api_key=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    if (!id) return

    setData({loading: true, data: {}, error: null});
    getDataChamps(url);

  }, [id]);

  const getDataChamps = async (url) => {
    try {
      const data = await getFetch(url);
      const reformedData = data.slice(0, data.length > 12 ? 12 : data.length);

      let groupOfData = []

      reformedData.forEach( metaChamp => {
        championsData.find( ([x, champion]) => {
          
          if(metaChamp.championId == champion.key){
              groupOfData.push({
                name: champion.name,
                image: `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.id}.png`,
                splashImage: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
                stats: champion.stats,
                tags: champion.tags,
                points: metaChamp.championPoints,
                level: metaChamp.championLevel
              });

              setData( ( {data} ) =>{
                return {
                  loading: false,
                  data: groupOfData,
                  error: null
                }
              });

          }
          
        })
      })

    } catch (error) {
      setData({loading: false, data: {}, error});
    }
  }

  return {champsData};

}