import React, { useContext } from 'react';
import { SearchContext } from '../SearchContext';

const Option = () => {
  const { sortType, setSortType, query } = useContext(SearchContext);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
    <div className='search__menu'>
      <h1>Search Results: {query}</h1>
      <select id='sort-type' value={sortType} onChange={handleSortChange}>
        <option value='title'>Title, A-Z</option>
        <option value='title-desc'>Title, Z-A</option>
        <option value='Old-New'>Old to New</option>
        <option value='New-Old'>New to Old</option>
      </select>
    </div>
  );
};

export default Option;