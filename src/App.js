import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { StrictMode } from 'react';
import { render, createRoot } from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdoptedPetContext from './components/AdoptedPetContext';
import WrappedDetails from './components/Details';
import SearchParams from './components/SearchParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to="/">Adopt me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<WrappedDetails />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
