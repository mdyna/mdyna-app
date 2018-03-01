import { combineReducers } from 'redux';
import tasks from './tasks';
import editor from './editor';
// import filters from './filters';

const dynaApp = combineReducers({
  tasks,
  editor,
});
export default dynaApp;
