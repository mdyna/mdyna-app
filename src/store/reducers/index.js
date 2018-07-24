import { combineReducers } from 'redux';
import notes from './notes';
import editor from './editor';
import reminders from './reminders';
import style from './style';
// import filters from './filters';

const dynaApp = combineReducers({
  notes,
  editor,
  style,
  reminders,
});
export default dynaApp;
