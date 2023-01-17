import React, { useState } from 'react' 

export function LiveMatchAbilitieButton ({abilitieImageUrl, imageId, index, parentSetState, parentState}) {

  const handleClick = () => {
    parentState === index ? parentSetState(null) : parentSetState(index)    
  }
  
  return <button onClick={handleClick}>
  <img src={`${abilitieImageUrl}${imageId}`} alt='Champion abilitie'></img>
</button>
}