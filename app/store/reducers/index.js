import { combineReducers } from 'redux';
import cards from './cards';
import settings from './settings';
import favs from './favs';
import labels from './labels';
import style from './style';
import boards from './boards';
import filters from './filters';

const MdynaApp = combineReducers({
  cards,
  boards,
  favs,
  labels,
  settings,
  style,
  filters,
});
export default MdynaApp;
