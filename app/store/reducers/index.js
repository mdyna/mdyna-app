import { combineReducers } from 'redux';
import cards from './cards';
import editor from './editor';
import labels from './labels';
import style from './style';
import filters from './filters';

const MdynaApp = combineReducers({
  cards,
  editor,
  labels,
  style,
  filters,
});
export default MdynaApp;
