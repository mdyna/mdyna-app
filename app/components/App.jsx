import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grommet, Box, Layer } from 'grommet';
import { ToastContainer } from 'react-toastify';
// import Loader from 'UI/Loader';
import ErrorBoundary from 'UI/Error';
import CardList from 'Containers/CardList';
import Settings from 'Containers/Settings';
import SearchInput from 'Containers/Search';
import Sidebar from 'Containers/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import BoardsDialog from 'Containers/Boards';
import ApplyTheme from 'Utils/titlebarTheme';
import { updatesListener } from 'Utils/events';
import { getTheme, getPalette } from '../themes/themeBuilder';

import './App.scss';

const MODAL_MODES = {
  SETTINGS: 'SETTINGS',
};

class Mdyna extends Component {
  componentDidMount() {
    const { palette } = this;
    ApplyTheme(palette);
    updatesListener();
  }

  componentDidUpdate(prevProps) {
    const prevTheme = prevProps.theme;
    const { theme } = this.props;
    if (theme !== prevTheme) {
      const { palette } = this;
      ApplyTheme(palette);
    }
  }

  get palette() {
    const { theme } = this.props;
    return getPalette(theme);
  }

  get theme() {
    const { theme } = this.props;
    return getTheme(theme);
  }

  render() {
    const {
      settingsModal,
      boardsDialogOpen,
      toggleBoardsDialog,
      toggleSettings,
    } = this.props;
    const modalMode = settingsModal && MODAL_MODES.SETTINGS;
    return (
      <Grommet className="mdyna-app" theme={this.theme}>
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

          <Box fill="vertical" direction="row">
            <Sidebar gridArea="menu" />
            <Box direction="column" fill="horizontal">
              <SearchInput />
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

Mdyna.whyDidYouRender = {
  logOnDifferentValues: true,
};

Mdyna.propTypes = {
  settingsModal: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  boardsDialogOpen: PropTypes.bool.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
};

Mdyna.defaultProps = {
  theme: 'dark',
};

export default Mdyna;
