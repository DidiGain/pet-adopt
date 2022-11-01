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
    <div className="search-params">
      <form onSubmit={onFormSubmit}>
        {adoptedPet ? (
          <div className="pet">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
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
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={!breeds.length}>
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
