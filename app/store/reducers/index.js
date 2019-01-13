import { combineReducers } from 'redux';
import cards from './cards';
import editor from './editor';
import tasks from './tasks';
import labels from './labels';
import style from './style';
import filters from './filters';

const MdynaApp = combineReducers({
  cards,
  editor,
  labels,
  style,
  tasks,
  filters,
});
export default MdynaApp;
