import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SearchProvider } from './SearchContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </StrictMode>
  </BrowserRouter>
);