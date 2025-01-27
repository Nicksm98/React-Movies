import React from 'react'
import Img from './Img'

const Genres = ({ secondHalf }) => {
  return (
    <div className='genre__container'>
        {secondHalf.map(image => (
          <Img
            key={image.id} 
            src={image.src}
            alt={image.alt}
            className={image.className}
            genre={image.genre}
          />
        ))}
    </div>
  )
}

export default Genres