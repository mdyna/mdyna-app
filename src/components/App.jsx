/* eslint-disable */
import React, { Component } from 'react';
import TEST_DATA from '../dev/testData.json';
import TaskList from '../containers/TaskList';
import ReminderList from '../containers/ReminderList';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Split from 'grommet/components/Split';
import Section from 'grommet/components/Section';
import Header from './Header';
import Nav from './Nav';
import Image from 'grommet/components/Image';

import '!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css';
import '!style-loader!css-loader!sass-loader!./App.scss'; // eslint-disable-line

class Dyna extends Component {
  render() {
    return (
      <App className="dyna-app" style={{ maxWidth: '1920px' }}>
        <Nav />
        <Article>
          <Header />
          <Split flex="right" fixed={false}>
            <ReminderList />
            <TaskList />
          </Split>
        </Article>
      </App>
    );
  }
}

export default Dyna;
