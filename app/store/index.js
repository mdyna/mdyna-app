import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { debounce } from 'lodash'; // eslint-disable-line
import createDebounce from 'redux-debounced';
import MdynaApp from './reducers';
import { getLocalState, saveState } from './localStorage';

const localState = getLocalState();

const store = createStore(
  MdynaApp,
  localState,
  applyMiddleware(logger, createDebounce()),
);

const saveStateToStorage = () => {
  const {
    cards, labels, boards, favs, settings, style, filters,
  } = store.getState();
  saveState(
    {
      cards,
      labels,
      boards,
      favs,
    },
    {
      codeTheme: settings.codeTheme,
      theme: style.theme,
      githubUserName: settings.githubUserName,
      gistId: settings.gistId,
      githubPassword: settings.githubPassword,
      order: filters.order,
      activeBoard: filters.activeBoard,
      cardsPerPage: settings.cardsPerPage,
      deletedCards: settings.deletedCards || [],
      sorting: filters.sorting,
      cwd: settings.cwd,
    },
  );
};

store.subscribe(
  debounce(saveStateToStorage, 5000),
);

export const getUserData = () => ({
  cards: store.getState().cards,
  labels: store.getState().labels,
  deletedCards: store.getState().settings.deletedCards,
  boards: store.getState().boards,
  favs: store.getState().favs,
});

export default store;
