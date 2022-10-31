import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import ThemeContext from './ThemeContext';

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Routes>
          <Route path="" element={} />
          <Route path="" element={} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<App />, document.getElementById('root'));
