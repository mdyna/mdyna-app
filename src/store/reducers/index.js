import { combineReducers } from 'redux';
import { tasks } from './tasks';
import { filters } from './filters';

const dinagramApp = combineReducers({
  visibilityFilter: filters.visibilityFilter,
  tasks,
});

export default dinagramApp;

