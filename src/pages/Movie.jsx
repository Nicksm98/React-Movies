import React, { useState, useEffect } from 'react'
import Description from '../components-movie/Description'
import Additional from '../components-movie/Additional'

const Movie = ({ imdbID, apiKey, query }) => {
  const [movie, setMovie] = useState(null)
  const [additionalMovies, setAdditionalMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        const data = await response.json()
        if (data.Response === 'True') {
          setMovie(data)
          const additionalResponse = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
          const additionalData = await additionalResponse.json()
          if (additionalData.Response === 'True') {
            setAdditionalMovies(additionalData.Search)
            setSearchResults(additionalData.Search)
          } else {
            setError(additionalData.Error)
          }
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