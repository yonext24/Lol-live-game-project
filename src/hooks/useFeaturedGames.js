import { useState, useEffect } from 'react' 
import { protocol, region, staticUrl } from '../assets/endPoints.json'

export function useFeaturedGames () {
  const url = `${protocol}${region[1]}${staticUrl.featuredGames}`

  
}