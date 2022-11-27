import { useNavigate, useParams } from 'react-router-dom';
import { lazy, useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import ErrorBoundary from './ErrorBoundary';
import fetchPet from '../hooks/fetchPet';
import useToggleMode from '../hooks/useToggle';
import LoadingSpinner from './LoadingSpinner';

const Modal = lazy(() => import('./Modal'));

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { show, handleToggle } = useToggleMode();
  const adoptedPet = useContext(AdoptedPetContext);
  const results = useQuery(['details', id], fetchPet);

  if (results.isLoading) {
    return <LoadingSpinner />;
  }

  const pet = results.data.pets[0];

  return (
    <div className="p-10">
      <img
        src={pet.images[0]}
        className="m-auto w-40 h-40 mb-10 rounded-full"
      />
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl text-pink-500 mb-5 text-center">{pet.name}</h1>
        <h2 className="font-bold mb-10 text-center">{`${pet.animal}: ${pet.breed} from ${pet.city}, ${pet.state}`}</h2>
        <div className="flex justify-center">
          <button
            className="m-auto mb-10 px-5 py-2 rounded-md bg-violet-500 text-white shadow-lg shadow-violet-400/50 hover:opacity-80 active:shadow-none disabled:bg-slate-500 disabled:shadow-none hover:disabled:opacity-100 hover:disabled:cursor-not-allowed"
            onClick={() => handleToggle(show)}
            disabled={adoptedPet[0]?.name === pet?.name}
          >
            {adoptedPet[0] !== null && adoptedPet[0]?.name === pet?.name
              ? `${pet.name} already adopted`
              : `Adopt ${pet.name}`}
          </button>
        </div>

        <p className="text-xl first-letter:ml-10">{pet.description}</p>
      </div>
      <Modal isOpen={show} hide={handleToggle} pet={pet} />
    </div>
  );
};

const WrappedDetails = (props) => {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
