import React, { useState } from 'react'

export function LiveMatchAbilitie({ data }) {
  const [level, setLevel] = useState(0)
  const levelLenght = data.cooldown.length
  const mapeableArray = Array.from(Array(levelLenght).keys())

  return <div className='live_match_abilitie_data'>
    <h4>{data.name}</h4>
    <p>Levels</p>
    <div className='live_match_abilitie_data_levels'>
      {
        mapeableArray.map(num => <button key={num} onClick={() => { setLevel(num) }}>{num + 1}</button>)
      }
    </div>
    <div className='abilitie_data'>
      <p>Cooldown: {data.cooldown[level]}</p>
      <p>Cost: {data.cost[level]}</p>
    </div>
  </div>
}