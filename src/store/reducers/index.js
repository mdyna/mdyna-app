import { combineReducers } from 'redux';
import tasks from './tasks';
// import filters from './filters';

const dynaApp = combineReducers({
  tasks,
});
export default dynaApp;
