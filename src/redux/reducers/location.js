import { CHANGE_LOCATION } from '../types';

const location = (state = '', action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

export default location;
