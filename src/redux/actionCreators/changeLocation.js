import { CHANGE_LOCATION } from '../types';

const changeLocation = (location) => {
  return { type: CHANGE_LOCATION, payload: location };
};

export default changeLocation;
