import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Nav from './components-home/Nav';
import Search from './pages/Search';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Footer from './components-search/Footer';

const App = () => {
  const [results, Results] = useState([]);
  const [query, Query] = useState("");
  const [error, Error] = useState("");

  return (
    <div>
      <Nav Results={Results} Error={Error} Query={Query} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search results={results} query={query} error={error} Results={Results} />} />
        <Route path="/movie/:imdbID" element={<Movie />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;