import React from 'react'
import Img from './Img'

const Genres = ({ secondHalf }) => {
  return (
    <div className='home__info'>
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
    </div>
  )
}

export default Genres
