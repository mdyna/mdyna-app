import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import {
  Filter,
  Brush,
  FormNext,
  FormPrevious,
  Up,
  Descend as Sort,
  FolderCycle,
  AddCircle,
  Checkmark,
  Configure,
} from 'grommet-icons';
import classnames from 'classnames';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import FolderPicker from 'UI/FolderPicker';

import './Settings.scss';

class Settings extends PureComponent {
  render() {
    const {
      whiteMode,
      toggleSettings,
      toggleWhiteMode,
      changeCwd,
      cwd,
    } = this.props;
    return (
      <Box className="settings" direction="column">
        <Box direction="row" justify="between">
          <Text size="xxlarge">Settings</Text>
          <Button
            color="accent-2"
            className="discard-btn"
            hoverIndicator="accent-2"
            onClick={() => toggleSettings()}
          >
            X
          </Button>
        </Box>
        <ErrorBoundary>
          <Box
            direction="row"
            justify="start"
            background="dark-2"
            responsive
            className="settings-container"
          >
            <Box direction="column">
              <Header />
              Mdyna version
              <Text size="small">{window.appVersion}</Text>
              Created by David Morais
            </Box>
            <Box direction="column">
              <Button
                color="brand"
                onClick={() => {
                  toggleWhiteMode(!whiteMode);
                }}
              >
                <Tooltip
                  icon={<Brush color="brand" />}
                  title="Set theme"
                  text={`Switch to ${whiteMode ? 'dark' : 'white'} theme`}
                  onClick={() => {
                    toggleWhiteMode(!whiteMode);
                  }}
                />
                <Text>
                  Switch to
                  {' '}
                  {whiteMode ? 'Dark Theme' : 'Light Theme'}
                </Text>
              </Button>

              <FolderPicker
                label="Change directory"
                placeholder={cwd}
                className="menu-label"
                onChange={(value) => {
                  changeCwd(value);
                  ipcRenderer.send('CHANGED-CWD');
                }}
              />
            </Box>
          </Box>
        </ErrorBoundary>
      </Box>
    );
  }
}

Settings.propTypes = {
  whiteMode: PropTypes.bool,
  changeCwd: PropTypes.func,
  settingsModal: PropTypes.bool,
  toggleSettings: PropTypes.func,
  toggleWhiteMode: PropTypes.func,
  cwd: PropTypes.string,
};

Settings.defaultProps = {
  whiteMode: false,
  changeCwd: null,
  settingsModal: true,
  toggleSettings: null,
  toggleWhiteMode: false,
  cwd: '',
};

export default Settings;
