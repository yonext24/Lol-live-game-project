import React, { useState } from 'react'
import './styles/championsdata.css'

export default function ChampionsData({ data }) {
  const [statsOpen, setStatsOpen] = useState(false)
  const { hp, armor, attackrange, attackspeed, movespeed, spellblock, attackdamage, hpregen } = data.stats

  return <div className='champ_data'>
    <img src={data.image} alt='champion image' draggable={false} />
    <div className='name_container'>
      <h3>{data.name}</h3>
      <span>Mastery level: {data.level}</span>
      <span>Mastery points: {data.points} </span>
    </div>
    <button className='stats_container' onClick={() => setStatsOpen(statsOpen ? false : true)}>
      <img src='arrow.svg' alt='arrow' />
      {
        statsOpen && <div className='champion_stats'>
          <div className='col1'>
            <span>Health: {hp}</span>
            <span>Armor: {armor}</span>
            <span>Magic r: {spellblock}</span>
            <span>Regen: {hpregen}</span>
          </div>
          <div className='col2'>
            <span>Attack: {attackdamage}</span>
            <span>At speed: {attackspeed}</span>
            <span>At range: {attackrange}</span>
            <span>Speed: {movespeed}</span>
          </div>
        </div>
      }
    </button>
  </div>
}