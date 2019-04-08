/* eslint-disable */
import React, { Component } from 'react';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import classnames from 'classnames';
import CardList from '../containers/CardList';
import SideBar from './Sidebar';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';

import '!style-loader!css-loader!sass-loader!../node_modules/grommet/grommet-hpe.min.css';
import './App.scss'; // eslint-disable-line

class Mdyna extends Component {

  render() {
    return (
      <App
        className={classnames('mdyna-app', { 'white-mode': this.props.whiteMode })}
        style={{ maxWidth: '1920px' }}
      >
      <ErrorBoundary whiteMode={this.props.whiteMode}>
        <Article>
          <Header />
          <Box className="split">
            <div className="sidebar-wrapper">
              <SideBar {...this.props}/>
            </div>
            <CardList />
          </Box>
        </Article>
      </ErrorBoundary>
      </App>
    );
  }
}

Mdyna.defaultProps = {
  whiteMode: false,
};

export default Mdyna;
