import React from 'react';
import Img from './Img';
import '../styles.css';

const Container = ({ images }) => {
  return (
    <div className="genre__container">
      {images.map((image) => (
          <Img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={image.className}
            genre={image.genre}
          />
      ))}
    </div>
  );
};

export default Container;