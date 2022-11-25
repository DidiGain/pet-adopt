import { CHANGE_BREED } from '../types';

const breed = (state = '', action) => {
  switch (action.type) {
    case CHANGE_BREED:
      return action.payload;
    default:
      return state;
  }
};

export default breed;
