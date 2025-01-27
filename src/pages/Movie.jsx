import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Description from '../components-movie/Description';
import Additional from '../components-movie/Additional';

const Movie = () => {
  const { imdbID } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [movie, setMovie] = useState(null);
  const [additionalMovies, setAdditionalMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
          const additionalResponse = await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`);
          const additionalData = await additionalResponse.json();
          if (additionalData.Response === 'True') {
            setAdditionalMovies(additionalData.Search);
          } else {
            setError(additionalData.Error);
          }
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID, apiKey, searchQuery]);

  console.log('movie:', movie);
  console.log('additionalMovies:', additionalMovies);
  console.log('loading:', loading);
  console.log('error:', error);

  return (
    <>
      <section id='movie__list'>
        <div className='search__container'>
          <div className='row'>
            <div className='page__bg'>
              <div className='movie__info'>
                <Description movie={movie} loading={loading} error={error} />
                {movie && <Additional additionalMovies={additionalMovies} currentMovieId={imdbID} query={searchQuery} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;