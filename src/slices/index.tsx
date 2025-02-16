import { combineReducers } from 'redux';
import checkboxReducer from './filterSlice';
import sortReducer from './sortSlice';
import ticketsReducer from './ticketsSlice';

const rootReducer = combineReducers({
  checkboxes: checkboxReducer,
  sort: sortReducer,
  tickets: ticketsReducer,
});

export default rootReducer;
