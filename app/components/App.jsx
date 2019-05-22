
import React, { PureComponent } from 'react';
import {ipcRenderer} from 'electron';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import classnames from 'classnames';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import TextInput from 'grommet/components/TextInput';
import debounce from 'lodash.debounce';
import CardList from '../containers/CardList';
import SideBar from './Sidebar';

/* eslint-disable */
import '!style-loader!css-loader!sass-loader!../node_modules/grommet/grommet-hpe.min.css';
import './App.scss';
/* eslint-enable */

class Mdyna extends PureComponent {

  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  changeCwd(value) {
    const {changeCwd} = this.props
    changeCwd(value);
    console.info('SENDING CHANGED-CWD EVENT')
    ipcRenderer.send('CHANGED-CWD');
  }

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
            <TextInput value={this.props.cwd} onDOMChange={e => this.changeCwd(e.target.value)}/>
            {
              this.props.cards ?
              <CardList cards={this.props.cards} order={this.props.order} sorting={this.props.sorting}/> :
              <Loader/>
            }
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
