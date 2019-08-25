/* eslint-disable */
import React, { PureComponent } from 'react';
import logo from 'Assets/MdynaLogo.png';
class AppHeader extends PureComponent {
  render() {
    return (
      <header>
        <img
          src={logo}
          style={{ maxWidth: '50vw', margin: '0 auto' }}
          className="App-logo"
          alt="Mdyna"
        />
        {this.props.children}
      </header>
    );
  }
}

export default AppHeader;
