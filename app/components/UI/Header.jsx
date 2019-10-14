/* eslint-disable */
import React, { PureComponent } from 'react';
import { ReactComponent as Logo } from 'Assets/logo.svg';
class AppHeader extends PureComponent {
  render() {
    return (
      <header>
        <Logo />
        {this.props.children}
      </header>
    );
  }
}

export default AppHeader;
