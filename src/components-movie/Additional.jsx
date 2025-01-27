import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Additional = ({ additionalMovies, currentMovieId, query }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (additionalMovies && additionalMovies.length > 0) {
      const filteredMovies = additionalMovies.filter(movie => movie.imdbID !== currentMovieId);
      setSimilarMovies(filteredMovies);
      setLoading(false);
    } else {
      const fetchSimilarMovies = async () => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=f7d594de`
          );
          const data = await response.json();
          if (data.Response === 'True') {
            setSimilarMovies(data.Search.filter(movie => movie.imdbID !== currentMovieId));
          } else {
            setError(data.Error);
          }
        } catch (err) {
          setError('Failed to fetch similar movies');
        } finally {
          setLoading(false);
        }
      };

      fetchSimilarMovies();
    }
  }, [query, currentMovieId, additionalMovies]);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + similarMovies.length) % similarMovies.length);
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % similarMovies.length);
  };

  const displayedMovies = similarMovies.slice(currentIndex, currentIndex + 4);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='additional__container'>
      <h2 className='extra__movie--heading'>Similar Movies</h2>
      <div className='extra__movie--container'>
        <button className='arrow-button' onClick={handlePrevClick}>
          <i className="fa-solid fa-angles-left"></i>
        </button>
        {displayedMovies.map(movie => (
          <div className='extra__movie--card' key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <Link to={`/movie/${movie.imdbID}`}>
              <h4>imdbID: <span className='imdb'>{movie.imdbID}</span></h4>
            </Link>
            {movie.Poster ? (
              <img
                className='extra__movie--poster'
                src={movie.Poster}
                alt={movie.Title}
              />
            ) : (
              <div className='extra__movie--poster-placeholder'>No Image Available</div>
            )}
            <h4>Release Date: {movie.Year}</h4>
          </div>
        ))}
        <button className='arrow-button' onClick={handleNextClick}>
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Additional;