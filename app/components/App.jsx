import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import debounce from 'lodash/debounce';
import CardList from 'Containers/CardList';
import CardEditor from 'Containers/CardEditor';
import SearchInput from 'UI/Search';
import SideBar from './Sidebar/Sidebar';
import ThemeBuilder from '../themes/themeBuilder';

import MdynaPalette from '../themes/mdyna.palette.json';
import WhitePalette from '../themes/mdyna-white.palette.json';
/* eslint-disable */
import './App.scss';
import { focusCard } from '../store/actions';

class Mdyna extends PureComponent {
  debouncedChangeCwd = val => debounce(() => this.changeCwd(val), 1000);

  searchBar = React.createRef();

  render() {
    const {
      cards,
      order,
      sorting,
      whiteMode,
      modalOpen,
      toggleEditor,
      searchInput,
      searchCards,
      focusCard,
      isFocused,
    } = this.props;
    return (
      <Grommet
        className="mdyna-app"
        theme={
          whiteMode ? ThemeBuilder(WhitePalette) : ThemeBuilder(MdynaPalette)
        }
      >
        <ErrorBoundary>
          <KeyboardEventHandler
            handleKeys={['ctrl+p', 'esc']}
            onKeyEvent={key =>
              isFocused
                ? key === 'esc' && focusCard(null)
                : key === 'ctrl+p' && this.searchBar.current.focus()
            }
          />
          <Header />
          <SearchInput
            hidden={isFocused}
            titles={cards && cards.length && cards.map(c => c.title)}
            onChange={e => searchCards(e)}
            searchBar={this.searchBar}
            searchInput={searchInput}
          />
          <Box fill="horizontal" direction="row">
            <div className="sidebar-wrapper">
              <SideBar gridArea="menu" {...this.props} />
            </div>
            {cards ? (
              <CardList
                isFocused={Boolean(isFocused)}
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
