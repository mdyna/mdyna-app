import { combineReducers } from 'redux';
import tasks from './tasks';
// import filters from './filters';

const dinagramApp = combineReducers({
  tasks,
});
export default dinagramApp;

