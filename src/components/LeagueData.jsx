import React, { useState } from 'react'
import { LeagueSelector } from './LeagueSelector'
import './styles/leaguedata.css'

export function LeagueData({ data }) {
  const [currentLeague, setCurrentLeague] = useState(0)

  const { wins, losses, tier } = data[currentLeague]
  const winrate = parseInt((wins / (wins + losses)) * 100)

  return <div className='league_data'>
    <div className='selector_container'>
      {
        data.map((league, index) => <LeagueSelector
          key={league.queueType}
          data={league}
          currentLeague={currentLeague}
          setCurrentLeague={setCurrentLeague}
          index={index} />)
      }
      <div className='selector_underline' style={{ left: currentLeague === 0 ? '4px' : 'calc(100% - 50px)', width: currentLeague === 0 ? '35px' : '50px' }}></div>
    </div>
    <div className='league_data_container'>
      <img className='league_img' alt='league photo' src={`./leagues/Emblem_${tier}.png`} />
      <div>
        <h4 className='league_tier'>{tier}</h4>
        <h6 className='winrate_text'>Winrate:</h6>
        <span className='winrate_span' style={{ color: winrate < 50 ? "var(--red)" : 'var(--green)' }}>
          {winrate}%
        </span>
        <div className='winrate_bar'>
          <div style={{width: `${winrate}%`}}></div>
        </div>
      </div>
    </div>
  </div>
}