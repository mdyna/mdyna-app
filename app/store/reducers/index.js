import { combineReducers } from 'redux';
import cards from './cards';
import editor from './editor';
import settings from './settings';
import labels from './labels';
import style from './style';
import boards from './boards';
import filters from './filters';

const MdynaApp = combineReducers({
  cards,
  boards,
  editor,
  labels,
  settings,
  style,
  filters,
});
export default MdynaApp;
