import { combineReducers } from 'redux';
import notes from './notes';
import editor from './editor';
import tasks from './tasks';
import style from './style';
// import filters from './filters';

const dynaApp = combineReducers({
  notes,
  editor,
  style,
  tasks,
});
export default dynaApp;
