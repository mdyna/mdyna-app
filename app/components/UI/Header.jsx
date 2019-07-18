/* eslint-disable */
import React, { PureComponent } from 'react';
import logo from 'Assets/MdynaLogo.png';
class AppHeader extends PureComponent {
  render() {
    return (
      <header>
        <img src={logo} className="App-logo" alt="Mdyna" />
      </header>
    );
  }
}

export default AppHeader;
