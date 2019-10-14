/* eslint-disable */
import React, { PureComponent } from 'react';
import SVG from 'react-inlinesvg';
import Logo from 'Assets/logo.svg';
class AppHeader extends PureComponent {
  render() {
    return (
      <header>
        <SVG src={Logo} />
        {this.props.children}
      </header>
    );
  }
}

export default AppHeader;
