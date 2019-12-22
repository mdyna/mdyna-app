import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ToastContainer } from 'react-toastify';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import CardList from 'Containers/CardList';
import Settings from 'Containers/Settings';
import SearchInput from 'UI/Search';
import SideBar from './Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import BoardsDialog from './BoardsDialog';
import { getTheme } from '../themes/themeBuilder';

import './App.scss';

const MODAL_MODES = {
  SETTINGS: 'SETTINGS',
};

class Mdyna extends PureComponent {
  searchBar = React.createRef();
  /* eslint-disable */
  render() {
    const {
      cards,
      order,
      sorting,
      settingsModal,
      whiteMode,
      deleteBoard,
      createBoard,
      searchInput,
      searchCards,
      changeActiveBoard,
      activeBoard,
      focusCard,
      boardsDialogOpen,
      changeBoardName,
      boards,
      toggleBoardsDialog,
      isFocused,
      boardNames,
      addLabelFilter,
      labelFilters,
      toggleSettings,
      toggleArchivedFilter,
      sidebarExpanded,
      removeLabelFilter,
      addCard,
      labels,
      archivedFilterOn,
      toggleSidebar,
      clearArchive,
      changeSorting,
    } = this.props;
    // ! TODO: STOP THIS NONSENSE
    /* eslint-enable */
    const SIDEBAR_PROPS = {
      labelFilters,
      clearArchive,
      addLabelFilter,
      toggleArchivedFilter,
      sidebarExpanded,
      isFocused,
      archivedFilterOn,
      toggleSidebar,
      toggleBoardsDialog,
      removeLabelFilter,
      addCard,
      activeBoard,
      toggleSettings,
      labels,
      sorting,
      order,
      changeSorting,
    };
    const modalMode = settingsModal && MODAL_MODES.SETTINGS;
    return (
      <Grommet className="mdyna-app" theme={getTheme(whiteMode)}>
        <ToastContainer
          style={{
            top: 50,
          }}
          position="top-right"
          className="toast-container"
          autoClose={2000}
          hideProgressBar={false}
        />
        <ErrorBoundary>
          <KeyboardEventHandler
            handleKeys={['ctrl+p', 'esc']}
            onKeyEvent={(key) => {
              if (isFocused && key === 'esc') {
                focusCard(null);
              } else if (key === 'ctrl+p') {
                this.searchBar.current.focus();
              }
            }}
          />
          <Box fill="vertical" direction="row">
            <SideBar gridArea="menu" {...SIDEBAR_PROPS} />
            <Box direction="column" fill="horizontal">
              <SearchInput
                hidden={isFocused}
                activeBoard={activeBoard}
                titles={
                  /* eslint-disable-next-line */
                  (cards && cards.length && cards.map(c => c.title)) || ['']
                }
                onChange={e => searchCards(e)}
                searchBar={this.searchBar}
                searchInput={searchInput}
              />
              {cards ? (
                <CardList
                  isFocused={Boolean(isFocused)}
                  gridArea="card-list"
                  cards={cards}
                  searchCards={searchCards}
                  order={order}
                  sorting={sorting}
                />
              ) : (
                <Loader />
              )}
            </Box>
          </Box>
          {boardsDialogOpen && (
            <Layer
              className="boards-dialog-layer"
              modal
              onClickOutside={() => toggleBoardsDialog()}
              onEsc={() => toggleBoardsDialog()}
            >
              <BoardsDialog
                activeBoard={activeBoard}
                boards={boards}
                boardNames={boardNames}
                createBoard={createBoard}
                deleteBoard={deleteBoard}
                changeActiveBoard={changeActiveBoard}
                toggleBoardsDialog={toggleBoardsDialog}
                changeBoardName={changeBoardName}
              />
            </Layer>
          )}
          {modalMode && (
            <Layer
              margin={{
                right: '14px',
              }}
              full
              onEsc={() => {
                if (modalMode === MODAL_MODES.SETTINGS) {
                  toggleSettings();
                }
              }}
              className="layer"
            >
              {modalMode === MODAL_MODES.SETTINGS && (
                <Settings deleteBoard={deleteBoard} />
              )}
            </Layer>
          )}
        </ErrorBoundary>
      </Grommet>
    );
  }
}

Mdyna.defaultProps = {
  whiteMode: false,
  cards: [],
};

export default Mdyna;
