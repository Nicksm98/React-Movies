import React from 'react';
import '../styles.css';
import Container from './Container';

const Header = ({ firstHalf, searchResults, searchError }) => {
  return (
    <header className='home__info'>
      <div className="header__text">
        <h1 className="header__title">
          Find any movie you're looking for right here!
        </h1>
      </div>
      {searchResults?.length > 0 ? (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : ''}
                alt={movie.Title}
                className="movie-poster"
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <Container images={firstHalf} />
      )}
      {searchError && <div className="error-message">{searchError}</div>}
    </header>
  )
}


export default Header;