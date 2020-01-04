import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grommet, Box, Layer } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { ToastContainer } from 'react-toastify';
// import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import CardList from 'Containers/CardList';
import Settings from 'Containers/Settings';
import SearchInput from 'Containers/Search';
import Sidebar from 'Containers/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import BoardsDialog from 'Containers/Boards';
import { getTheme } from '../themes/themeBuilder';

import './App.scss';

const MODAL_MODES = {
  SETTINGS: 'SETTINGS',
};

class Mdyna extends PureComponent {
  searchBar = React.createRef();

  render() {
    const {
      settingsModal,
      whiteMode,
      focusCard,
      boardsDialogOpen,
      toggleBoardsDialog,
      isFocused,
      toggleSettings,
    } = this.props;
    // ! TODO: STOP THIS NONSENSEL
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
            <Sidebar gridArea="menu" />
            <Box direction="column" fill="horizontal">
              <SearchInput searchBar={this.searchBar} />
              <CardList gridArea="card-list" />
            </Box>
          </Box>
          {boardsDialogOpen && (
            <Layer
              className="boards-dialog-layer"
              modal
              onClickOutside={() => toggleBoardsDialog()}
              onEsc={() => toggleBoardsDialog()}
            >
              <BoardsDialog />
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
Mdyna.propTypes = {
  settingsModal: PropTypes.bool.isRequired,
  whiteMode: PropTypes.bool,
  boardsDialogOpen: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  focusCard: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
};

Mdyna.defaultProps = {
  whiteMode: false,
};

export default Mdyna;
