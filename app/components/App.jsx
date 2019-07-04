import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import debounce from 'lodash.debounce';
import CardList from 'Containers/CardList';
import CardEditor from 'Containers/CardEditor';
import SideBar from './Sidebar/Sidebar';
import ThemeBuilder from '../themes/themeBuilder';

import MdynaPalette from '../themes/mdyna.palette.json';
import WhitePalette from '../themes/mdyna-white.palette.json';
/* eslint-disable */
import './App.scss';
/* eslint-enable */

class Mdyna extends PureComponent {
  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  render() {
    // eslint-disable-next-line
    const { cards, order, sorting, whiteMode, modalOpen, toggleEditor } = this.props;
    return (
      <Grommet
        className="mdyna-app"
        theme={whiteMode ? ThemeBuilder(WhitePalette) : ThemeBuilder(MdynaPalette)}
      >
        <ErrorBoundary>
          <Header />
          <Box
            fill="horizontal"
            direction="row"
          >
            <div className="sidebar-wrapper">
              <SideBar gridArea="menu" {...this.props} />
            </div>
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
              className="note-layer"
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
