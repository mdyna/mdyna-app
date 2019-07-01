import React, { PureComponent } from 'react';
import { v1 } from 'grommet-theme-v1';
import { Grommet, Box, Layer } from 'grommet';
import classnames from 'classnames';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import debounce from 'lodash.debounce';
import CardList from 'Containers/CardList';
import CardEditor from 'Containers/CardEditor';
import SideBar from './Sidebar/Sidebar';

/* eslint-disable */
import './App.scss';
/* eslint-enable */

class Mdyna extends PureComponent {
  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  render() {
    // eslint-disable-next-line
    const { cards, order, sorting, whiteMode, sidebarExpanded, modalOpen, toggleEditor } = this.props;
    return (
      <Grommet
        className={classnames('mdyna-app', { 'white-mode': whiteMode })}
        theme={v1}
      >
        <ErrorBoundary whiteMode={whiteMode}>
          <Header />
          <Box
            fill="horizontal"
            direction="row"
          >
            <SideBar gridArea="menu" {...this.props} />
            {cards ? (
              <CardList
                gridArea="card-list"
                cards={cards}
                order={order}
                sorting={sorting}
              />
            ) : (
              <Loader />
            )}
          </Box>
          {modalOpen ? (
            <Layer
              margin={{
                right: '14px',
              }}
              full
              onEsc={() => toggleEditor()}
              className={classnames('note-layer', { 'white-mode': whiteMode })}
            >
              <CardEditor />
            </Layer>
          ) : (
            ''
          )}
        </ErrorBoundary>
      </Grommet>
    );
  }
}

Mdyna.defaultProps = {
  whiteMode: false,
};

export default Mdyna;
