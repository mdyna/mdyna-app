/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { remote } from 'electron';
import handleWindowControls from 'Utils/windowControls.js';
import registerServiceWorker from './config/registerServiceWorker';
import Root from './config/Root';
import { Provider } from 'react-redux';
import store from './store';

let MdynaStore = store;

if (window.env === 'DEV') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, { exclude: [/^Switch/, /^Router/, /^Route/, /^Connect/] });
}

const render = Component => {
  store.getState();
  handleWindowControls();
  ReactDOM.render(
    <Provider store={MdynaStore}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(Root);
registerServiceWorker();
handleWindowControls(remote);


if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
