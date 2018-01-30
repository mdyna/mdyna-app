/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/DinagramLogo.png';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';



import "!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css"; 

class AppHeader extends Component {
  render() {
    return (
          <Header
            size="small"
          >
            <Image
              src={logo}
              className="App-logo"
              alt="dinagram logo"
              size="small"
            />
            <Heading
              size="large"
              align="center"
              tag="h1"
            >
              Dinagram
            </Heading>
            <Heading
            size="small"
            align="end"
            tag="h2"
          > 
            Making the most of your free time
          </Heading>
        </Header>
    );
  }
} 

export default AppHeader;
