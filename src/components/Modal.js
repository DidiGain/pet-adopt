import { useRef, useEffect, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import useToggleMode from '../hooks/useToggle';
import AdoptedPetContext from './AdoptedPetContext';

const Modal = ({ isOpen, hide, pet }) => {
  const navigate = useNavigate();
  const { handleToggle } = useToggleMode();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const modal = (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 z-50 w-screen h-screen text-base md:text-xl lg:text-2xl bg-black/70 overflow-hidden"
      onClick={hide}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-1/2 lg:w-1/3 p-10 bg-white rounded shadow-lg z-100 text-center"
      >
        <h1 className="mb-10 text-pink-700">Wanna adopt {pet.name}?</h1>
        <div className="flex justify-center items-center gap-2">
          <button
            className="py-1 px-7 bg-pink-500 text-white shadow-lg rounded hover:opacity-80 active:shadow-none"
            onClick={() => {
              setAdoptedPet(pet);
              hide();
              navigate('/');
            }}
          >
            Yes
          </button>
          <button
            className="px-1 bg-gray-500 text-white shadow-lg rounded hover:opacity-80 active:shadow-none"
            onClick={hide}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  return isOpen ? createPortal(modal, document.body) : null;
};

export default Modal;
