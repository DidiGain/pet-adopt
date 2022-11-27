import { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdoptedPetContext from './AdoptedPetContext';

const AdoptedPet = ({ adoptedPet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();

  const toggleHover = () => {
    setIsHovered((prev) => !prev);
  };

  const deletePet = () => {
    setAdoptedPet(null);
  };

  return (
    <>
      {' '}
      <div
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="relative w-1/4 flex flex-col items-center gap-1"
      >
        {isHovered && (
          <button
            onClick={deletePet}
            className="absolute -top-1 right-5 flex items-center justify-center p-3 object-fit w-15 h-8 rounded bg-slate-400 text-white shadow-lg shadow-slate-600/50 opacity-80 hover:opacity-100 active:shadow-none ease-in duration-300"
          >
            Delete
          </button>
        )}
        <img
          src={adoptedPet.images[0]}
          alt={adoptedPet.name}
          className="object-contain rounded-full"
        />
      </div>
      <Link to={`/details/${adoptedPet?.id}`}>
        <button className="py-1 px-5 rounded-md bg-violet-500 text-white shadow-lg shadow-violet-400/50 hover:opacity-80 active:shadow-none">
          Adopted pet info
        </button>
      </Link>
    </>
  );
};

export default AdoptedPet;
