import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchResults = () => {
  const [results, Results] = useState([])
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const searchQuery = query.get('q') || query.get('genre')
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
      const data = await response.json()
      Results(data.Search || [])
    }

    fetchResults()
  }, [searchQuery, apiKey])

  return (
    <div>
      <h1>Search Results for {searchQuery}</h1>
      <div className="results">
        {results.map((result) => (
          <div key={result.imdbID} className="result">
            <img src={result.Poster} alt={result.Title} />
            <h2>{result.Title}</h2>
            <p>{result.Year}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults