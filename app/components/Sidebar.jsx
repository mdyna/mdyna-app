import React, { PureComponent } from 'react';
// eslint-disable-next-line
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import { Box, Text, Collapsible } from 'grommet';
import {
  FormPrevious,
  AddCircle,
  Archive,
  Star,
  Configure,
} from 'grommet-icons';
import BoardsIcon from 'UI/BoardsIcon';
import classnames from 'classnames';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import GistSync from 'Containers/GistSync';
import Favs from 'Containers/Favs';

import './Sidebar.scss';

class Sidebar extends PureComponent {
  state = {
    favsExpanded: false,
  };

  expandMenu() {
    const { toggleSidebar } = this.props;
    toggleSidebar();
  }


  expandFavs() {
    const { favsExpanded } = this.state;
    this.setState({
      favsExpanded: !favsExpanded,
    });
  }

  sidebar() {
    const {
      activeBoard,
      addCard,
      archivedFilterOn,
      clearArchive,
      githubAuthOn,
      toggleArchivedFilter,
      toggleBoardsDialog,
      toggleSettings,
    } = this.props;
    const {
      favsExpanded,
    } = this.state;

    return (
      <>
        <Button
          hoverIndicator="accent-1"
          onClick={() => addCard(activeBoard)}
          className="expandable"
        >
          <AddCircle color="brand" />
          <Text className="menu-label">Add Card</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          icon={<AddCircle color="brand" />}
          className={classnames('sidebar-tooltip', 'collapsible')}
          title="Add card"
          text="Add card (Use 'A' hotkey)"
          onClick={() => {
            addCard(activeBoard);
          }}
        />
        <Button
          className="expandable"
          hoverIndicator="accent-1"
          onClick={() => toggleBoardsDialog()}
        >
          <BoardsIcon color="brand" />
          <Text className="menu-label">Boards</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          icon={<BoardsIcon color="brand" />}
          className="sidebar-tooltip"
          title="Manage boards"
          text="Add, delete or edit boards"
          onClick={() => {
            toggleBoardsDialog();
          }}
        />
        <Button
          className="expandable"
          hoverIndicator="accent-1"
          plain
          onClick={() => this.expandFavs()}
        >
          <Star color="brand" />
          <Text className="menu-label">Favorites</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          className="sidebar-tooltip"
          icon={<Star color="brand" />}
          title="Favorites"
          text="Open your favorites and quickly focus on them"
          onClick={() => {
            this.expandMenu();
            this.expandFavs();
          }}
        />
        <Box className={classnames('expandable-menu', 'expandable')} background="dark-1">
          <Collapsible direction="vertical" open={favsExpanded}>
            <Favs />
          </Collapsible>
        </Box>
        <Button
          className="expandable"
          onClick={() => toggleArchivedFilter(!archivedFilterOn)}
          color={(archivedFilterOn && 'accent-3') || 'brand'}
          hoverIndicator="accent-1"
        >
          <Archive color={archivedFilterOn ? 'accent-3' : 'brand'} />
          <Text className="menu-label">Archive</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          className="sidebar-tooltip"
          icon={<Archive color={archivedFilterOn ? 'accent-3' : 'brand'} />}
          title="Show Archive"
          text="See your archived cards"
          onClick={() => {
            toggleArchivedFilter(!archivedFilterOn);
          }}
        />
        <Box className="expandable-menu sub-menu expandable" background="dark-1">
          <Collapsible direction="vertical" open={archivedFilterOn}>
            <Button hoverIndicator="accent-2" onClick={() => clearArchive()}>
              Clear Archive
            </Button>
          </Collapsible>
        </Box>
        <Button
          hoverIndicator="accent-1"
          plain
          className="expandable"
          onClick={() => toggleSettings()}
        >
          <Configure color="brand" />
          <Text className="menu-label">Settings</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          className="sidebar-tooltip"
          icon={<Configure color="brand" />}
          title="Settings"
          text="Open MDyna settings interface"
          onClick={() => {
            toggleSettings();
          }}
        />
        <Box className="sidebar-tooltip">
          <GistSync
            githubAuthOn={githubAuthOn}
            badge
            onClick={() => {
              toggleSettings();
            }}
          />
        </Box>
        <Box direction="column" className="expandable">
          <GistSync
            githubAuthOn={githubAuthOn}
            onClick={() => {
              toggleSettings();
            }}
          />
          <Text size="small" className="help">
            Keyboard Shortcuts
            <Tooltip data="keyboard-shortcuts" />
          </Text>
        </Box>
      </>
    );
  }


  render() {
    const { sidebarExpanded, toggleSidebar } = this.props;

    return (
      <Box
        className={classnames('sidebar', sidebarExpanded && 'expanded')}
        direction="column"
        alignContent="end"
        background="dark-2"
      >
        <Button
          hoverIndicator="accent-1"
          className={classnames('title-btn', !sidebarExpanded && 'collapsed')}
          onClick={() => toggleSidebar()}
        >
          <FormPrevious color="brand" />
          <Text>MDYNA</Text>
        </Button>
        {this.sidebar()}
      </Box>
    );
  }
}

Sidebar.whyDidYouRender = true;

Sidebar.propTypes = {
  activeBoard: PropTypes.string,
  addCard: PropTypes.func.isRequired,
  archivedFilterOn: PropTypes.bool,
  clearArchive: PropTypes.func.isRequired,
  githubAuthOn: PropTypes.bool.isRequired,
  sidebarExpanded: PropTypes.bool,
  toggleArchivedFilter: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  activeBoard: 'INBOX',
  archivedFilterOn: false,
  sidebarExpanded: false,
};

export default Sidebar;
