import { combineReducers } from 'redux';
import tasks from './tasks';
import editor from './editor';
import reminders from './reminders';
// import filters from './filters';

const dynaApp = combineReducers({
  tasks,
  editor,
  reminders,
});
export default dynaApp;
