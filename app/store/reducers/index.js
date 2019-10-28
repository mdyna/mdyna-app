import { combineReducers } from 'redux';
import cards from './cards';
import settings from './settings';
import labels from './labels';
import style from './style';
import boards from './boards';
import filters from './filters';

const MdynaApp = combineReducers({
  cards,
  boards,
  labels,
  settings,
  style,
  filters,
});
export default MdynaApp;
