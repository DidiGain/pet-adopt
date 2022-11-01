import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, useState, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdoptedPetContext from './components/AdoptedPetContext';
// import WrappedDetails from './components/Details';
// import SearchParams from './components/SearchParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import('./components/Details'));
const SearchParams = lazy(() => import('./components/SearchParams'));

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div className="m-0 p-0">
      <Suspense
        fallback={
          <h2 className="flex justify-center items-center mt-10">Loading...</h2>
        }
      >
        <BrowserRouter>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <QueryClientProvider client={queryClient}>
              <header className="w-full mb-10 p-7 bg-gradient-to-r from-violet-400 via-pink-500 to-violet-400 text-center">
                <Link
                  to="/"
                  className="text-5xl text-orange-200 hover:text-cyan-700 transition ease delay-100"
                >
                  Adopt me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </QueryClientProvider>
          </AdoptedPetContext.Provider>
        </BrowserRouter>
      </Suspense>
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
