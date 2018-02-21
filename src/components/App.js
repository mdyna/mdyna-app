/* eslint-disable */
import React, { Component } from 'react';
import logo from '../../assets/DinagramLogo.png';
import TEST_DATA from '../dev/testData.json';
import TaskList from '../containers/TaskList';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Header from './Header';
import Image from 'grommet/components/Image';

import '!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css';

class Dyna extends Component {
  render() {
    return (
      <App className="dyna-app">
        <Article>
          <Header />
          <Section align="center">
            <TaskList />
          </Section>
        </Article>
      </App>
    );
  }
}

export default Dyna;
