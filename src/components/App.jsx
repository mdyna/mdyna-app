/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Split from 'grommet/components/Split';
import classnames from 'classnames';
import NoteList from '../containers/NoteList';
import TaskList from '../containers/TaskList';
import Nav from './Nav';
import Header from './Header';

import '!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css';
import '!style-loader!css-loader!sass-loader!./App.scss'; // eslint-disable-line

class Dyna extends Component {
  render() {
    return (
      <App
        className={classnames('dyna-app', { 'white-mode': this.props.whiteMode })}
        style={{ maxWidth: '1920px' }}
      >
        <Nav {...this.props}/>
        <Article>
          <Header />
          <Split flex="right" fixed={false}>
            <TaskList />
            <NoteList />
          </Split>
        </Article>
      </App>
    );
  }
}

Dyna.defaultProps = {
  whiteMode: false,
};

export default Dyna;
