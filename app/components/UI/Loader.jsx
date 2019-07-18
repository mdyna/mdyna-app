import React, { Component as PureComponent } from 'react';
import logo from 'Assets/MdynaLogo.png';

class Loader extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <img src={logo} className="App-logo" alt="Mdyna" />
      </React.Fragment>
    );
  }
}

export default Loader;
