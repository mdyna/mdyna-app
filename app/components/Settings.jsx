import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import { Brush, Configure } from 'grommet-icons';
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
    const newTheme = whiteMode ? 'dark' : 'white';
    return (
      <Box className="settings" direction="column">
        <Button
          color="accent-2"
          className="discard-btn"
          hoverIndicator="accent-2"
          onClick={() => toggleSettings()}
        >
          X
        </Button>
        <ErrorBoundary>
          <Box direction="row" justify="start" responsive>
            <Box direction="column">
              <Header />
              <Text size="xxlarge">Mdyna</Text>
              <Text>
                version:
                {window.appVersion}
              </Text>

              <Text>Created by David Morais</Text>
            </Box>
            <Box
              direction="column"
              background="dark-2"
              className="settings-container"
            >
              <Text size="xxlarge" as="h1">
                <Configure color="brand" />
                Settings
              </Text>
              <Button
                color="brand"
                onClick={() => {
                  toast.success(`Switched to ${newTheme} theme`);
                  toggleWhiteMode(!whiteMode);
                }}
              >
                <Tooltip
                  icon={<Brush color="brand" />}
                  title="Set theme"
                  text={`Switch to ${newTheme} theme`}
                  onClick={() => {
                    toast.success(`Switched to ${newTheme}`);
                    toggleWhiteMode(!whiteMode);
                  }}
                />
                <Text>{`Switch to ${newTheme} theme`}</Text>
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
  toggleSettings: PropTypes.func,
  toggleWhiteMode: PropTypes.func,
  cwd: PropTypes.string,
};

Settings.defaultProps = {
  whiteMode: false,
  changeCwd: null,
  toggleSettings: null,
  toggleWhiteMode: false,
  cwd: '',
};

export default Settings;
