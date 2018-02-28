/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/dynaLogo.png';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';

class AppHeader extends Component {
  render() {
    return (
      <Header size="small">
        <Image src={logo} className="App-logo" alt="dyna" size="small" />
        <Heading size="large" align="center" tag="h1">
          yna
        </Heading>
        <Heading size="small" align="end" tag="h2">
          myze
        </Heading>
      </Header>
    );
  }
}

export default AppHeader;
