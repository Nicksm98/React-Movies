import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Description = () => {
  const { imdbID } = useParams()
  const [movie, Movie] = useState(null)
  const [loading, Loading] = useState(true)
  const [error, Error] = useState(null)


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=f7d594de`
        )
        const data = await response.json()
        if (data.Response === 'True') {
          Movie(data)
        } else {
          Error(data.Error)
        }
      } catch (err) {
        Error('Failed to fetch movie details')
      } finally {
        Loading(false)
      }
    }

    fetchMovie()
  }, [imdbID])

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
