import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import {
  Brush,
  Configure,
  Globe,
  ChatOption,
  Github,
  Twitter,
  MailOption,
  Note,
} from 'grommet-icons';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import FolderPicker from 'UI/FolderPicker';

import './Settings.scss';

const renderAppInfo = () => (
  <Box direction="column">
    <Header />
    <Text size="xxlarge" as="h1">
      Mdyna
    </Text>
    <Text>{window.appVersion}</Text>
    <Text size="large" color="brand">
      <a href="https://mdyna.dev">
        <Globe color="brand" />
        Website
      </a>
    </Text>
    <Text size="large" color="brand">
      <ChatOption color="brand" />
      <a href="https://spectrum.chat/mdyna/">Community</a>
    </Text>
    <Text size="large" color="brand">
      <Github color="brand" />
      <a href="https://github.com/mdyna/mdyna-app/">Github</a>
    </Text>
    <Box align="center" direction="column">
      <Text>Created by David Morais</Text>
      <Text size="medium">
        <a href="https://twitter.com/Psybork">
          <Twitter color="brand" />
        </a>
        <a href="https://github.com/dmorais92">
          <Github color="brand" />
        </a>
        <a href="mailto:davidmorais92@gmail.com">
          <MailOption color="brand" />
        </a>
      </Text>
    </Box>
  </Box>
);
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
          <Box direction="row" justify="center" responsive>
            {renderAppInfo()}
            <Box
              direction="column"
              background="dark-2"
              className="settings-container"
            >
              <Text size="xxlarge" as="h1">
                <Configure color="brand" />
                Settings
              </Text>
              <Text size="large" as="h2">
                <Brush color="brand" />
                Appearence
              </Text>
              <Box direction="row" className="settings-section">
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
              </Box>
              <Text size="large" as="h2">
                <Note color="brand" />
                Cards
              </Text>
              <Box direction="row" className="settings-section">
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
