import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ToastContainer } from 'react-toastify';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import CardList from 'Containers/CardList';
import Settings from 'Containers/Settings';
import SearchInput from 'UI/Search';
import SideBar from './Sidebar/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import BoardsDialog from './BoardsDialog';
import { getTheme } from '../themes/themeBuilder';

/* eslint-disable */
import './App.scss';

const MODAL_MODES = {
  SETTINGS: 'SETTINGS',
};

class Mdyna extends PureComponent {
  searchBar = React.createRef();

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
      toggleSettings,
    } = this.props;
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
            onKeyEvent={key => {
              if (isFocused && key === 'esc') {
                focusCard(null);
              } else if (key === 'ctrl+p') {
                this.searchBar.current.focus();
              }
            }}
          />
          <Box fill="vertical" direction="row">
            <div className="sidebar-wrapper">
              <SideBar gridArea="menu" {...this.props} />
            </div>
            <Box direction="column" fill="horizontal">
              <SearchInput
                hidden={isFocused}
                activeBoard={activeBoard}
                titles={
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
              modal={true}
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
              {modalMode === MODAL_MODES.SETTINGS && <Settings />}
            </Layer>
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
