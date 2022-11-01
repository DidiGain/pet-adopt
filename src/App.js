import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, useState, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdoptedPetContext from './components/AdoptedPetContext';
import Header from './components/Header';
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
              <Header />
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
