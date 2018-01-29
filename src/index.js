/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './config/registerServiceWorker';
import Root from './config/Root';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './store'

let dinagramStore = store;

const render = (Component) => {
  store.getState()
  ReactDOM.render(
    <AppContainer>
      <Provider store={dinagramStore}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}