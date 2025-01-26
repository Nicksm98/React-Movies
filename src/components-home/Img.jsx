import React from 'react';
import '../styles.css';

const Img = ({ src, alt, className, genre }) => {
  return (
    <div className='genres'>
      <figure className='genre__wrapper'>
        <img src={src || null} alt={alt} className={className} />
        <div className='genre__bg'></div>
        <div className='genre__description'>
          <div>{genre}</div>
        </div>
      </figure>
    </div>
  );
};

export default Img;