import React from 'react'
import { useLocation } from 'wouter'
import { useUsersCurrentMatch } from '../hooks/useUsersCurrentMatch'
import { LiveMatchUserEntry } from './LiveMatchUserEntry'
import './styles/livematchpage.css'


export function LiveMatchPage() {
  const [location] = useLocation() 

  const { matchData } = useUsersCurrentMatch(location)

  return <section className='live_game_page_container'>
    {
      matchData.data.team1 &&
      <div className='live_game_grid'>
        <div className='live_game_row team1'>
          {
            matchData.data.team1.map(el => <LiveMatchUserEntry data={el} key={el.userData.id} />)
          }
        </div>
        <div className='live_game_row team2'>
          {
            matchData.data.team2.map(el => <LiveMatchUserEntry data={el} key={el.userData.id} />)
          }
        </div>
      </div>
    }
  </section>
}