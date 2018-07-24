import { combineReducers } from 'redux';
import tasks from './tasks';
import editor from './editor';
import reminders from './reminders';
import style from './style';
// import filters from './filters';

const dynaApp = combineReducers({
  tasks,
  editor,
  style,
  reminders,
});
export default dynaApp;
