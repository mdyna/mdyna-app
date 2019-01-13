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
      tasks: store.getState().tasks,
      notes: store.getState().notes,
      style: store.getState().style,
      cards: store.getState().cards,
      labels: store.getState().labels,
    });
  }),
  1000,
);

export default store;
