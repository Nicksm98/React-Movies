import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Additional = ({ additionalMovies, currentMovieId, query }) => {
  const [similarMovies, SimilarMovies] = useState([])
  const [loading, Loading] = useState(true)
  const [error, Error] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (additionalMovies && additionalMovies.length > 0) {
      const filteredMovies = additionalMovies.filter(movie => movie.imdbID !== currentMovieId).slice(0, 4)
      SimilarMovies(filteredMovies)
      Loading(false)
    } else {
      const fetchSimilarMovies = async () => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
          )
          const data = await response.json()
          if (data.Response === 'True') {
            SimilarMovies(data.Search.filter(movie => movie.imdbID !== currentMovieId).slice(0, 4))
          } else {
            Error(data.Error)
          }
        } catch (err) {
          Error('Failed to fetch similar movies')
        } finally {
          Loading(false)
        }
      }

      fetchSimilarMovies()
    }
  }, [query, currentMovieId, apiKey, additionalMovies])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='additional__container'>
      <h2 className='extra__movie--heading'>Similar Movies</h2>
      <div className='extra__movie--container'>
        {similarMovies.map(movie => (
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
      </div>
    </div>
  )
}

export default Additional