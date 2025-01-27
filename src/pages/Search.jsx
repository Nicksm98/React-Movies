import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Movies from '../components-search/Movies';
import Option from '../components-search/Option';
import { SearchContext } from '../SearchContext';

const Search = () => {
  const {
    results,
    visibleMovies,
    page,
    fetchMovies,
    setVisibleMovies,
    setPage,
    setResults,
    error,
    sortType,
  } = useContext(SearchContext);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery, page); 
    }
  }, [searchQuery, fetchMovies, setPage, setResults]);

  const showMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 10);
  };

  const sortMovies = (movies) => {
    switch (sortType) {
      case 'title':
        return movies.sort((a, b) => a.Title.localeCompare(b.Title));
      case 'title-desc':
        return movies.sort((a, b) => b.Title.localeCompare(a.Title));
      case 'Old-New':
        return movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      case 'New-Old':
        return movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      default:
        return movies;
    }
  };

  const sortedMovies = sortMovies([...results]);

  return (
    <section id='movies__list'>
      <div className='search__container'>
        <div className='row'>
          <div className='page__bg'>
            {error && <div className="error">{error}</div>}
            <Option />
            <Movies movies={sortedMovies.slice(0, visibleMovies)} />
            {results.length > visibleMovies && (
              <button className='show-more-button' onClick={showMoreMovies}>Show More</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;