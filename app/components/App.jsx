import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ToastContainer } from 'react-toastify';
import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
import CardList from 'Containers/CardList';
import CardEditor from 'Containers/CardEditor';
import Settings from 'Containers/Settings';
import SearchInput from 'UI/Search';
import SideBar from './Sidebar/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import BoardsDialog from './BoardsDialog';
import ThemeBuilder from '../themes/themeBuilder';

import MdynaPalette from '../themes/mdyna.palette.json';
import WhitePalette from '../themes/mdyna-white.palette.json';
/* eslint-disable */
import './App.scss';
import { focusCard } from '../store/actions';

function getModalMode(editor, settings) {
  return (editor && 'editor') || (settings && 'settings') || false;
}

class Mdyna extends PureComponent {
  searchBar = React.createRef();

  render() {
    const {
      cards,
      order,
      sorting,
      settingsModal,
      whiteMode,
      modalOpen,
      toggleEditor,
      deleteBoard,
      createBoard,
      searchInput,
      searchCards,
      focusCard,
      boardsDialogOpen,
      boards,
      toggleBoardsDialog,
      isFocused,
      toggleSettings,
    } = this.props;
    const modalMode = getModalMode(modalOpen, settingsModal);
    return (
      <Grommet
        className="mdyna-app"
        theme={
          whiteMode ? ThemeBuilder(WhitePalette) : ThemeBuilder(MdynaPalette)
        }
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
        />
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
          {boardsDialogOpen && (
            <Layer modal={false}>
              <BoardsDialog
                boards={boards}
                createBoard={createBoard}
                deleteBoard={deleteBoard}
                toggleBoardsDialog={toggleBoardsDialog}
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
                if (modalMode === 'editor') {
                  toggleEditor();
                } else if (modalMode === 'settings') {
                  toggleSettings();
                }
              }}
              className="note-layer"
            >
              {modalMode === 'editor' && <CardEditor />}
              {modalMode === 'settings' && <Settings />}
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
