/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/DinagramLogo.png';
import TEST_DATA from '../dev/testData.json';
import Button from 'grommet/components/Button';
import App from 'grommet/components/App';

import "!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css";

class Dinagram extends Component {
  render() {
    return (
      <App>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Tsts</h2>
        </div>
        <p className="App-intro">
          To get gtarted, edit <code>src/App.js</code> and save to reload.
        </p>
      </App>
    );
  }
}

export default Dinagram;
