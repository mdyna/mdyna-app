import { createStore } from 'redux';
import dynaApp from './reducers';

const store = createStore(dynaApp);

export default store;
