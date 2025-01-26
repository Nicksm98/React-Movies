import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Additional = ({ additionalMovies, currentMovieId, query }) => {
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (additionalMovies && additionalMovies.length > 0) {
      const filteredMovies = additionalMovies.filter(movie => movie.imdbID !== currentMovieId).slice(0, 4)
      setSimilarMovies(filteredMovies)
      setLoading(false)
    } else {
      const fetchSimilarMovies = async () => {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
          )
          const data = await response.json()
          if (data.Response === 'True') {
            setSimilarMovies(data.Search.filter(movie => movie.imdbID !== currentMovieId).slice(0, 4))
          } else {
            setError(data.Error)
          }
        } catch (err) {
          setError('Failed to fetch similar movies')
        } finally {
          setLoading(false)
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