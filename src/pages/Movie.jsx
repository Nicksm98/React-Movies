import React, { useState, useEffect } from 'react'
import Description from '../components-movie/Description'
import Additional from '../components-movie/Additional'

const Movie = ({ imdbID, apiKey, query }) => {
  const [movie, Movie] = useState(null)
  const [additionalMovies, AdditionalMovies] = useState([])
  const [loading, Loading] = useState(true)
  const [error, Error] = useState(null)
  const [searchResults, SearchResults] = useState([])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        const data = await response.json()
        if (data.Response === 'True') {
          Movie(data)
          const additionalResponse = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
          const additionalData = await additionalResponse.json()
          if (additionalData.Response === 'True') {
            AdditionalMovies(additionalData.Search)
            SearchResults(additionalData.Search)
          } else {
            Error(additionalData.Error)
          }
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
  }, [imdbID, apiKey, query])

  return (
    <>
      <section id='movie__list'>
        <div className='search__container'>
          <div className='row'>
            <div className='page__bg'>
              <div className='movie__info'>
                <Description movie={movie} loading={loading} error={error} />
                {movie && <Additional additionalMovies={additionalMovies} currentMovieId={imdbID} query={query} searchResults={searchResults} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Movie