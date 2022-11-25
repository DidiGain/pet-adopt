import { CHANGE_BREED } from '../types';

const changeBreed = (breed) => {
  return { type: CHANGE_BREED, payload: breed };
};

export default changeBreed;
