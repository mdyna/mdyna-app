/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import TEST_DATA from '../dev/testData.json';
import Button from 'grommet/components/Button';
import App from 'grommet/components/App';

import "!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css";
import "!style-loader!css-loader!sass-loader!../style.scss";

class Dinagram extends Component {
  render() {
    return (
      <App>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        <Button
          label="Button"
          >
        </Button>
          <h2 id="heading">Hello ReactJS {TEST_DATA.name}</h2>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </App>
    );
  }
}

export default Dinagram;
