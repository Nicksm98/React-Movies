import React from 'react';
import { Link } from 'react-router-dom';

const Movies = ({ movies }) => {
  return (
    <div className='movies-grid'>
      {movies.map((movie, index) => (
        <div className='movie-card' key={`${movie.imdbID}-${index}`}>
          <h3>{movie.Title}</h3>
          <Link to={`/movie/${movie.imdbID}`}>
          <h3>imdbID: <span className='imdb'>{movie.imdbID}</span></h3>
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img className='movie-poster' src={movie.Poster} alt={movie.Title} />
            ) : (
              <div className='movie-poster-placeholder'>No Image Available</div>
            )}
          </Link>
          <h3>Release Date: {movie.Year}</h3>
        </div>
      ))}
    </div>
  );
};

export default Movies;