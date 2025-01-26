import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../comps/SearchBar'

const Nav = ({ Results, Error, Query }) => {
  const [query] = useState('')
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    const apiKey = process.env.REACT_APP_API_KEY
    const page = 1 
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=${page}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.Response === 'False') {
        throw new Error(data.Error)
      }
      Query(query)
      Results(data.Search)
      navigate(`/search?q=${encodeURIComponent(query)}`)
    } catch (error) {
      console.error('Error fetching data:', error)
      Error(error.message)
    }
  }

  return (
    <>
      <div className='overlay'>
        <a className='home__btn' href='/'>
          Home
        </a>
        <SearchBar
          handleSearch={handleSearch}
          query={query}
        />
      </div>
    </>
  )
}

export default Nav