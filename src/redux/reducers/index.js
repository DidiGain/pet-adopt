import { combineReducers } from 'redux';
import animal from './animal';
import breed from './breed';
import location from './location';

export default combineReducers({ animal, breed, location });
