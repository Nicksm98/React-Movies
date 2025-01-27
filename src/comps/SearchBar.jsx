import React from 'react';

const SearchBar = ({ query, handleSearch }) => {
  return (
    <div className='search__bar'>
      <form className='search__input' onSubmit={handleSearch}>
        <input
          className='search__box'
          type='search'
          value={query}
          onChange={(e) => (e.target.value)}
          placeholder='Search movies...'
        />
        <button className='search__btn' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;