import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { throttle } from 'lodash';
import createDebounce from 'redux-debounced';
import MdynaApp from './reducers';
import { getLocalState, saveState } from './localStorage';

const localState = getLocalState();

const store = createStore(
  MdynaApp,
  localState,
  applyMiddleware(logger, createDebounce()),
);

store.subscribe(
  throttle(() => {
    saveState(
      {
        cards: store.getState().cards,
        labels: store.getState().labels,
        boards: store.getState().boards,
      },
      {
        codeTheme: store.getState().settings.codeTheme,
        whiteMode: store.getState().style.whiteMode,
        githubUserName: store.getState().settings.githubUserName,
        gistId: store.getState().settings.gistId,
        githubPassword: store.getState().settings.githubPassword,
        order: store.getState().filters.order,
        activeBoard: store.getState().filters.activeBoard,
        cardsPerPage: store.getState().settings.cardsPerPage,
        deletedCards: store.getState().settings.deletedCards || [],
        sorting: store.getState().filters.sorting,
        cwd: store.getState().settings.cwd,
      },
    );
  }),
  1000,
);

export const getUserData = () => ({
  cards: store.getState().cards,
  labels: store.getState().labels,
  deletedCards: store.getState().settings.deletedCards,
  boards: store.getState().boards,
});

export default store;
