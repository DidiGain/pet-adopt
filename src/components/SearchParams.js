import { useQuery } from '@tanstack/react-query';
import { useContext, useDeferredValue, useState, useMemo } from 'react';
import AdoptedPetContext from './AdoptedPetContext';
import Results from './Results';
import fetchSearch from '../hooks/fetchSearch';
import useBreedList from '../hooks/useBreedList';
import fetchBreedList from '../hooks/fetchBreedList';
import AdoptedPet from './AdoptedPet';
import { useDispatch, useSelector } from 'react-redux';
import changeAnimal from '../redux/actionCreators/changeAnimal';
import changeBreed from '../redux/actionCreators/changeBreed';
import changeLocation from '../redux/actionCreators/changeLocation';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const animal = useSelector((state) => state.animal);
  const breed = useSelector((state) => state.breed);
  const location = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const [adoptedPet] = useContext(AdoptedPetContext);
  const [breeds] = useBreedList(animal);
  const [requestParams, setRequestParams] = useState({
    animal,
    breed,
    location,
  });

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

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
        {adoptedPet ? <AdoptedPet adoptedPet={adoptedPet} /> : null}

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
            onChange={(e) => dispatch(changeLocation(e.target.value))}
            value={location}
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
              dispatch(changeAnimal(e.target.value));
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value));
            }}
            value={animal}
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
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
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
      {renderedPets}
    </div>
  );
};

export default SearchParams;
