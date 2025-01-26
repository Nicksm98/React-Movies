import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, Results] = useState([]);
  const [visibleMovies, VisibleMovies] = useState(10);
  const [page, Page] = useState(1);
  const [sortType, SortType] = useState('');
  const [error, Error] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchMovies = async (query, page) => {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      Results(prevResults => [...prevResults, ...data.Search]);
    } catch (error) {
      Error(error.message);
    }
  };

  useEffect(() => {
    const sortedResults = [...results].sort((a, b) => {
      switch (sortType) {
        case 'title':
          return a.Title.localeCompare(b.Title);
        case 'title-desc':
          return b.Title.localeCompare(a.Title);
        case 'Old-New':
          return new Date(a.Year) - new Date(b.Year);
        case 'New-Old':
          return new Date(b.Year) - new Date(a.Year);
        default:
          return 0;
      }
    });
    Results(sortedResults);
  }, [sortType, results]);

  return (
    <SearchContext.Provider
      value={{
        results,
        visibleMovies,
        page,
        sortType,
        error,
        Results,
        VisibleMovies,
        Page,
        SortType,
        fetchMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};