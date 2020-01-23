import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Select } from 'grommet';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import { capitalize } from 'lodash';
import ErrorBoundary from 'UI/Error';
import Header from 'UI/Header';
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
import { changeCwdEvent } from 'Utils/events';
import Tooltip from 'UI/Tooltip';
import GistSync from 'Containers/GistSync';
import Button from 'UI/Button';
import FolderPicker from 'UI/FolderPicker';
import BoardsDialog from './BoardsDialog';
import { CODE_THEMES } from './MarkdownEditorThemes';

import './Settings.scss';

const renderAppInfo = () => (
  <Box direction="row" background="dark-1" className="app-info" responsive>
    <Header>
      <Text size="xxlarge" as="h1">
        MDyna
      </Text>
      <Text>{window.appVersion}</Text>
    </Header>
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
      <a href="https://github.com/mdyna/mdyna-app/">GitHub</a>
    </Text>
    <Box align="center" direction="column" className="credits">
      <Text>Created by David Morais</Text>
      <a href="https://twitter.com/Psybork">
        <Twitter color="brand" />
      </a>
      <a href="https://github.com/dmorais92">
        <Github color="brand" />
      </a>
      <a href="mailto:davidmorais92@gmail.com">
        <MailOption color="brand" />
      </a>
    </Box>
  </Box>
);
class Settings extends PureComponent {
  render() {
    const {
      whiteMode,
      toggleSettings,
      toggleWhiteMode,
      changeCodeTheme,
      cardsPerPage,
      changeCardsPerPage,
      codeTheme,
      changeActiveBoard,
      createBoard,
      deleteBoard,
      activeBoard,
      changeBoardName,
      lastSyncDate,
      githubAuthOn,
      changeCwd,
      boards,
      cwd,
      boardNames,
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
          <Box direction="row" justify="center" className="settings-layout">
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
                  <Text>
                    Switch to
                    {` ${capitalize(newTheme)} Theme`}
                  </Text>
                </Button>
                <Box direction="column">
                  <Text>Cards per page</Text>
                  <Select
                    label="Cards per page"
                    options={['2', '4', '8', '10']}
                    value={String(cardsPerPage)}
                    onChange={({ option }) => changeCardsPerPage(Number(option))
                    }
                  />
                </Box>
                <Box direction="column">
                  <Text>Code snippets theme</Text>
                  <Select
                    label="Cards per page"
                    options={['Default', ...Object.keys(CODE_THEMES)]}
                    value={codeTheme}
                    onChange={({ option }) => changeCodeTheme(option)}
                  />
                </Box>
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
                    changeCwdEvent();
                  }}
                />
                <GistSync
                  skipLogin
                  lastSyncDate={lastSyncDate}
                  githubAuthOn={githubAuthOn}
                />
              </Box>
              <BoardsDialog
                activeBoard={activeBoard}
                boards={boards}
                boardNames={boardNames}
                createBoard={createBoard}
                deleteBoard={deleteBoard}
                changeActiveBoard={changeActiveBoard}
                changeBoardName={changeBoardName}
              />
              {renderAppInfo()}
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
  createBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  changeBoardName: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  changeActiveBoard: PropTypes.func.isRequired,
  codeTheme: PropTypes.string,
  toggleWhiteMode: PropTypes.func,
  activeBoard: PropTypes.string.isRequired,
  lastSyncDate: PropTypes.object.isRequired,
  githubAuthOn: PropTypes.bool.isRequired,
  boardNames: PropTypes.array,
  cwd: PropTypes.string,
  changeCodeTheme: PropTypes.func,
  changeCardsPerPage: PropTypes.func,
  cardsPerPage: PropTypes.number,
};

Settings.defaultProps = {
  whiteMode: false,
  changeCardsPerPage: null,
  changeCwd: null,
  boardNames: [],
  toggleSettings: null,
  changeCodeTheme: null,
  codeTheme: 'Default',
  toggleWhiteMode: false,
  cwd: '',
  cardsPerPage: 8,
};

export default Settings;
