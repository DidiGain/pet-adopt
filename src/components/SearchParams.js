import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import Results from './Results';
import fetchSearch from '../hooks/fetchSearch';
import useBreedList from '../hooks/useBreedList';
import fetchBreedList from '../hooks/fetchBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    animal: '',
    breed: '',
    location: '',
  });

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get('animal') ?? '',
      breed: formData.get('breed') ?? '',
      location: formData.get('location') ?? '',
    };
    setRequestParams(obj);
  };

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 p-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center gap-5"
        onSubmit={onFormSubmit}
      >
        {adoptedPet ? (
          <div className="pet">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <div>
          <label htmlFor="location" className="block font-bold mb-2">
            Location
          </label>
          <input
            id="location"
            className="w-60 block focus:outline-none focus:shadow-outline rounded leading-tight"
            type="text"
            name="location"
            placeholder="Location"
          />
        </div>

        <div>
          <label htmlFor="animal" className="block font-bold mb-2">
            Animal
          </label>
          <select
            id="animal"
            className="w-60 block focus:outline-none focus:shadow-outline rounded leading-tight"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="breed" className="block font-bold mb-2">
            Breed
          </label>
          <select
            className="w-60 block disabled:opacity-50 focus:outline-none focus:shadow-outline rounded leading-tight"
            id="breed"
            name="breed"
            disabled={!breeds.length}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <button
          className="py-1 px-5 rounded-md bg-violet-500 text-white shadow-lg shadow-violet-400/50 hover:opacity-80 active:shadow-none"
          type="submit"
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
