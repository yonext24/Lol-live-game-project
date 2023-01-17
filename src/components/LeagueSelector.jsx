import React from 'react' 

export function LeagueSelector ({ data, setCurrentLeague, currentLeague, index }) {
  const league = data.queueType === 'RANKED_SOLO_5x5' ? 'SOLOQ' : 'FLEX'

  const handleClick = () => {
    setCurrentLeague(index)
  }

  return <button className='league_button' disabled={currentLeague === index} onClick={handleClick} >{league}</button> 
}