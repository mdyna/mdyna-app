/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/dynaLogo.png';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';

import '!style-loader!css-loader!sass-loader!./Nav.scss'; // eslint-disable-line
class NavBar extends Component {
  render() {
    return (
      <Box full="horizontal" justify="start" className="navbar" pad="small">
        <Image src={logo} className="navbar-app-logo" alt="dyna" size="small" />
      </Box>
    );
  }
}

export default NavBar;
