import React from 'react'
import './index.css'

interface Props {
    item: Record<string, any>
}

function Card({item}:Props) {
  return (
    <div className='main'>
        <div className='title'>
            <span>{item.name}</span>
        </div>
        <div className='instruction'>{item.instructions}</div>
    </div>
  )
}

export default Card