import React, { Component as PureComponent } from 'react';
import logo from 'Assets/MdynaLogo.png';

import './Loader.scss';

class Loader extends PureComponent {
  render() {
    return (
      <div className="loader">
        <img src={logo} className="App-logo" alt="Mdyna" />
      </div>
    );
  }
}

export default Loader;
