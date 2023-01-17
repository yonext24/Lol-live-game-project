import React, { useState } from 'react'
import { Link } from 'wouter'
import { LiveMatchAbilitie } from './LiveMatchAbilitie'
import { LiveMatchAbilitieButton } from './LiveMatchAbilitieButton'

export function LiveMatchUserEntry({ data }) {
  const [abilitieOpen, setAbilitieOpen] = useState(null)

  const abilitieImageUrl = 'https://ddragon.leagueoflegends.com/cdn/12.23.1/img/spell/'
  console.log(data)

  return <article className='live_game_user'>
    <header>
      <Link href={`/${data.userData.name}`}>
        <a>
          {data.userData.name}
        </a>
      </Link>
    </header>
    <div className='live_game_champion_data_container'>
      <img src={'http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/' + data.championData.image.full} alt='champion image' />
      <div className='live_game_champion_data'>
        <h4>{data.championData.name}</h4>
        <div>
          {
            data.championData.tags.map(tag => <span key={tag}>{tag}</span>)
          }
        </div>
      </div>

    </div>
    {
      abilitieOpen !== null && <LiveMatchAbilitie data={data.championData.spells[abilitieOpen]} />
    }
    <footer>
      {
        data.championData.spells.map((spell, index) => {
          return <LiveMatchAbilitieButton 
          abilitieImageUrl={abilitieImageUrl}
          imageId={spell.image.full}
          index={index}
          parentSetState={setAbilitieOpen}
          parentState={abilitieOpen}
          key={spell.image.full}
           />
        })
      }
    </footer>

  </article>
}