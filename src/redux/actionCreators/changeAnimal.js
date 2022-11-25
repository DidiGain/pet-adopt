import { CHANGE_ANIMAL } from '../types';

const changeAnimal = (animal) => {
  return { type: CHANGE_ANIMAL, payload: animal };
};

export default changeAnimal;
