import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import dynaApp from './reducers';

const store = createStore(
    dynaApp,
    applyMiddleware(logger)
);

export default store;
