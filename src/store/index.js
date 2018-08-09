import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { throttle } from 'lodash';
import dynaApp from './reducers';
import { getLocalState, saveState } from './localStorage';

const localState = getLocalState();
const store = createStore(dynaApp, localState, applyMiddleware(logger));

store.subscribe(
  throttle(() => {
    saveState({
      tasks: store.getState().tasks,
      style: store.getState().style,
      notes: store.getState().notes,
      labels: store.getState().labels,
    });
  }),
  1000,
);

export default store;
