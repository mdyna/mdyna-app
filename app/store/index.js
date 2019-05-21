import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { throttle } from 'lodash';
import MdynaApp from './reducers';
import { getLocalState, saveState } from './localStorage';

const localState = getLocalState();
const store = createStore(MdynaApp, localState, applyMiddleware(logger));

store.subscribe(
  throttle(() => {
    saveState({
      cards: store.getState().cards,
      labels: store.getState().labels,
    },
    {
      darkMode: store.getState().style.whiteMode,
      order: store.getState().filters.order,
      sorting: store.getState().filters.sorting,
      cwd: store.getState().settings.cwd,
    });
  }),
  1000,
);

export default store;
