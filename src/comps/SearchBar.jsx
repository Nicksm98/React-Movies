import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; 
    
    handleSearch(e); 
  };

  const onChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='search__bar'>
      <form className='search__input' onSubmit={onSubmit}>
        <input
          className='search__box'
          type='search'
          name='query'
          value={query}
          onChange={onChange}
          placeholder='Search movies...'
          required
        />
        <button 
          className='search__btn' 
          type='submit'
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;