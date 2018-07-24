/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Split from 'grommet/components/Split';
import classnames from 'classnames';
import NoteList from '../containers/NoteList';
import ReminderList from '../containers/ReminderList';
import Nav from './Nav';
import Header from './Header';

import '!style-loader!css-loader!sass-loader!../../node_modules/grommet/grommet-hpe.min.css';
import '!style-loader!css-loader!sass-loader!./App.scss'; // eslint-disable-line

class Dyna extends Component {
  render() {
    const { toggleWhiteMode, whiteMode } = this.props;
    return (
      <App
        className={classnames('dyna-app', { 'white-mode': this.props.whiteMode })}
        style={{ maxWidth: '1920px' }}
      >
        <Nav toggleWhiteMode={toggleWhiteMode} whiteMode={whiteMode} />
        <Article>
          <Header />
          <Split flex="right" fixed={false}>
            <ReminderList />
            <NoteList />
          </Split>
        </Article>
      </App>
    );
  }
}

Dyna.propTypes = {
  toggleWhiteMode: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
};

Dyna.defaultProps = {
  whiteMode: false,
};

export default Dyna;
