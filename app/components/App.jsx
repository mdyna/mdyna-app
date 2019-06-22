import React, { PureComponent } from 'react';
import { v1 } from 'grommet-theme-v1';
import { Grommet, Box } from 'grommet';
import classnames from 'classnames';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import debounce from 'lodash.debounce';
import CardList from '../containers/CardList';
import SideBar from './Sidebar/Sidebar';

/* eslint-disable */
import './App.scss';
/* eslint-enable */

class Mdyna extends PureComponent {
  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  render() {
    // eslint-disable-next-line
    const { cards, order, sorting, whiteMode } = this.props;
    return (
      <Grommet
        className={classnames('mdyna-app', { 'white-mode': whiteMode })}
        full
        theme={v1}
      >
        <ErrorBoundary whiteMode={whiteMode}>
          <Box>
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
          </Box>
        </ErrorBoundary>
      </Grommet>
    );
  }
}

Mdyna.defaultProps = {
  whiteMode: false,
};

export default Mdyna;
