/* eslint-disable */
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const PATH_TO_LOGO = '../../../resources/MdynaLogo.png';
class AppHeader extends PureComponent {
  render() {
    return (
      <header>
        <img src={PATH_TO_LOGO} className="App-logo" alt="Mdyna"/>
      </header>
    );
  }
}


export default AppHeader
