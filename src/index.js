/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './config/registerServiceWorker';
import Root from './config/Root';
import { Provider } from 'react-redux';
import store from './store';

let dynaStore = store;

const render = Component => {
  store.getState();
  ReactDOM.render(
    <AppContainer>
      <Provider store={dynaStore}>
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
