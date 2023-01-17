import React from 'react'
import { Buscador } from './Buscador'
import { FeaturedGames } from './FeaturedGames'

export function HomePage() {

  return <>
    <Buscador />
    <div className='data_container'>
      <div className='userdata_container'>
        <div></div>
        <div></div>
      </div>
      <div className='championsdata_container'>
      </div>
    </div>
    <FeaturedGames />
  </>
}