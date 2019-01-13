/* eslint-disable */
import React, { Component } from 'react';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Split from 'grommet/components/Split';
import classnames from 'classnames';
import CardList from '../containers/CardList';
import Nav from './Nav';
import Header from './Header';

import '!style-loader!css-loader!sass-loader!../node_modules/grommet/grommet-hpe.min.css';
import '!style-loader!css-loader!sass-loader!./App.scss'; // eslint-disable-line

class Mdyna extends Component {

  render() {
    return (
      <App
        className={classnames('mdyna-app', { 'white-mode': this.props.whiteMode })}
        style={{ maxWidth: '1920px' }}
      >
        <Nav {...this.props}/>
        <Article>
          <Header />
          <Split flex="right" fixed={false}>
            <CardList isTaskList={true} sortByFrequency={true}/>
            <CardList />
          </Split>
        </Article>
      </App>
    );
  }
}

Mdyna.defaultProps = {
  whiteMode: false,
};

export default Mdyna;
