import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full mb-10 p-7 bg-gradient-to-r from-violet-400 via-pink-500 to-violet-400 text-center">
      <Link
        to="/"
        className="text-5xl text-orange-200 hover:text-red-300 transition ease delay-100"
      >
        Adopt me!
      </Link>
    </header>
  );
};

export default Header;
