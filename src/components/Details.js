import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import fetchPet from '../hooks/fetchPet';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const results = useQuery(['details', id], fetchPet);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-box">
        <h2 className="loader">
          <AiOutlineLoading3Quarters />
        </h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <img />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Wanna adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
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
