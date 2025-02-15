import React, { createContext, useState, useCallback } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(10);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('title');


  const fetchMovies = useCallback(async (query, page, reset = false) => {
    if (reset) {
      setResults([]); // Clear previous results for new search
    }
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
      setResults(prevResults => {
        const uniqueMovies = new Set(prevResults.map(movie => movie.imdbID));
        const newMovies = data.Search.filter(movie => !uniqueMovies.has(movie.imdbID));
        return [...prevResults, ...newMovies];
      });
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        results,
        visibleMovies,
        page,
        fetchMovies,
        setVisibleMovies,
        setPage,
        setResults,
        error,
        sortType,
        setSortType
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};