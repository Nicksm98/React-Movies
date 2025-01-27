import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Movies from '../components-search/Movies';
import Option from '../components-search/Option';
import ErrorBoundary from '../comps/ErrorBoundary';
import { SearchContext } from '../SearchContext';

const Search = ({ query }) => {
  const {
    results,
    visibleMovies,
    page,
    error,
    setVisibleMovies,
    setPage,
    fetchMovies,
  } = useContext(SearchContext);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    fetchMovies(searchQuery, page);
  }, [searchQuery, page, fetchMovies]);

  const showMoreMovies = () => {
    setVisibleMovies(prevVisibleMovies => prevVisibleMovies + 10);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <section id='movies__list'>
        <div className='search__container'>
          <div className='row'>
            <div className='page__bg'>
              <div className='page__info'>
                {error && <p>Error: {error}</p>}
                {Array.isArray(results) && results.length ? (
                  <>
                    <ErrorBoundary>
                      <Option />
                    </ErrorBoundary>
                    <Movies movies={results.slice(0, visibleMovies)} />
                  </>
                ) : (
                  <p>No results found for "{query}"</p>
                )}
                <button onClick={showMoreMovies} className='show-more-button'>
                  Show More ({Math.min(10, results.length - visibleMovies)} more)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;