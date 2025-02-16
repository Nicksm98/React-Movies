import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../comps/SearchBar';

const Nav = ({ Results, Error, Query }) => {
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;

    const page = 1;
    const url = `https://www.omdbapi.com/?apikey=f7d594de&s=${encodeURIComponent(query)}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      Query(query);
      Results(data.Search);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      Error(error.message);
    }
  };

  return (
    <>
      <div className='overlay'>
      <button className='home__btn' onClick={() => navigate('/')}>Home</button>
        <SearchBar handleSearch={handleSearch} />
      </div>
    </>
  );
};

export default Nav;