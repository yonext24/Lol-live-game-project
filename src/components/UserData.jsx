import React from 'react'
import './styles/userdata.css'

export default function UserData({ data }) {
  console.log(data)
  return <div className='user_data'>
    <div className='user_img_container'>
      <img alt='user image' src={data.profileIcon} draggable={false} />
    </div>
    <div className='user_data_data'>
      <span className='user_level'>Level {data.level}</span>
      <h2 className='user_name'>{data.name}</h2>
    </div>
  </div>
}