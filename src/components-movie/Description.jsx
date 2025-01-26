import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Description = () => {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
        )
        const data = await response.json()
        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error)
        }
      } catch (err) {
        setError('Failed to fetch movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [imdbID, apiKey])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!movie) {
    return <p>No movie details available</p>
  }
  return (
    <>
      <div className='movie__description'>
        <div className='movie__wrapper'>
          <img className='movie__poster' src={movie.Poster} alt={movie.Title} />
        </div>
        <div className='movie__card'>
          <h2 className='movie__title'>{movie.Title}</h2>
          <div className='line-1'>
            <h2 className='movie__imdb--rating'>Rating: {movie.imdbRating}</h2><h2 className='movie__release'> Release Date: {movie.Year}</h2>
          </div>
          <div className='line'>
            <h2 className='movie__director'>Director: {movie.Director}</h2><h2 className='movie__imdb'> IMDB ID: {movie.imdbID}</h2>
          </div>
          <h2 className='movie__actors'>Actors: {movie.Actors}</h2>
          <h2 className='movie__genre'>Genre: {movie.Genre}</h2>
          <h2 className='movie__plot'>Plot: {movie.Plot}</h2>
        </div>
      </div>
    </>
  )
}

export default Description
