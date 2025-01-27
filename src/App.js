import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Nav from './components-home/Nav';
import Search from './pages/Search';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Footer from './components-search/Footer';

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <Nav Results={setResults} Error={setError} Query={setQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search results={results} query={query} error={error} setResults={setResults} />} />
        <Route path="/movie/:imdbID" element={<Movie />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;