import React, { PureComponent } from 'react';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import classnames from 'classnames';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import FolderPicker from 'UI/FolderPicker';
import debounce from 'lodash.debounce';
import CardList from '../containers/CardList';
import SideBar from './Sidebar';

/* eslint-disable */
import '!style-loader!css-loader!sass-loader!../node_modules/grommet/grommet-hpe.min.css';
import './App.scss';
/* eslint-enable */

class Mdyna extends PureComponent {
  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  render() {
    // eslint-disable-next-line
    const { cards, order, sorting, whiteMode } = this.props;
    return (
      <App
        className={classnames('mdyna-app', { 'white-mode': whiteMode })}
        style={{ maxWidth: '1920px' }}
      >
        <ErrorBoundary whiteMode={whiteMode}>
          <Article>
            <Header />
            <Box className="split">
              <div className="sidebar-wrapper">
                <SideBar {...this.props} />
              </div>
              {cards ? (
                <CardList
                  cards={cards}
                  order={order}
                  sorting={sorting}
                />
              ) : (
                <Loader />
              )}
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
