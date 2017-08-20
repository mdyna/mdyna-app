/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import TEST_DATA from '../dev/testData.json';
import Button from 'muicss/lib/react/button';

import "!style-loader!css-loader!sass-loader!../../node_modules/muicss/dist/css/mui.min.css";
import "!style-loader!css-loader!sass-loader!../style.scss";

class App extends Component {
  render() {
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        <Button variant="raised">
          I am a Button
        </Button>
          <h2 id="heading">Hello ReactJS {TEST_DATA.name}</h2>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
