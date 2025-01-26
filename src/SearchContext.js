import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(10);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('');
  const [error, setError] = useState(null);
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
      setResults(prevResults => [...prevResults, ...data.Search]);
    } catch (error) {
      setError(error.message);
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
    setResults(sortedResults);
  }, [sortType]);

  return (
    <SearchContext.Provider
      value={{
        results,
        visibleMovies,
        page,
        sortType,
        error,
        setResults,
        setVisibleMovies,
        setPage,
        setSortType,
        fetchMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};