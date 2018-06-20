import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { throttle } from 'lodash';
import dynaApp from './reducers';
import { getLocalState, saveState } from './localStorage';

const localState = getLocalState();
const store = createStore(
  dynaApp,
  localState,
  applyMiddleware(logger),
);

store.subscribe(throttle(() => {
  saveState({
    reminders: store.getState().reminders,
    tasks: store.getState().tasks,
  });
}), 1000);

export default store;
