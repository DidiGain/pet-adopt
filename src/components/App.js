import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, useState, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdoptedPetContext from './AdoptedPetContext';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import store from '../redux/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div className="m-0 p-0 relative">
      <Provider store={store}>
        <Suspense fallback={<LoadingSpinner />}>
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
      </Provider>
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
