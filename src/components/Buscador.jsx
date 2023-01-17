import React from 'react';
import { useLocation } from 'wouter';
import './styles/buscador.css'


export function Buscador() {
  const [_, setLocation] = useLocation()

  const getName = e => {
    e.preventDefault();
    setLocation("/" + e.target.player.value );
  }

  return (
    <>
      <form onSubmit={getName} className='search_form'>
        <input className='input_text' type="text" autoComplete='off' name='player' placeholder='Buscar jugador' />
        <input type="submit" value="Buscar" />
      </form>
    </>
  );
}