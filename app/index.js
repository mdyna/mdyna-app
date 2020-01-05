/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
// import { remote } from 'electron';
// import handleWindowControls from './utils/windowControls.js';
import registerServiceWorker from './config/registerServiceWorker';
import Root from './config/Root';
import { Provider } from 'react-redux';
import store from './store';

let MdynaStore = store;

const render = Component => {
  store.getState();
  // handleWindowControls();
  ReactDOM.render(
    <Provider store={MdynaStore}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(Root);
registerServiceWorker();
// handleWindowControls();

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
