import './Sidebar.scss';

import {
  AddCircle,
  Archive,
  Configure,
  FormPrevious,
  List,
  Star,
} from 'grommet-icons';
import { Box, Collapsible, Text } from 'grommet';
import React, { PureComponent } from 'react';

import BoardsIcon from 'UI/BoardsIcon';
import Button from 'UI/Button';
import CardList from 'Containers/CardList';
import Favs from 'Containers/Favs';
import GistSync from 'Containers/GistSync';
import PropTypes from 'prop-types';
import Tooltip from 'UI/Tooltip';
import classnames from 'classnames';

class Sidebar extends PureComponent {
  state = {
    favsExpanded: false,
    miniListExpanded: false,
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

  expandMiniList() {
    const { miniListExpanded } = this.state;
    this.setState({
      miniListExpanded: !miniListExpanded,
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
      miniListExpanded,
    } = this.state;

    return (
      <>
        {
        //= =======================================================================================
/*                                                                                      *
 *                                       Add Card                                       *
 *                                                                                      */
//= =======================================================================================

      }
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
        {
//= =======================================================================================
/*                                                                                      *
 *                                     Boards Dialog                                    *
 *                                                                                      */
//= =======================================================================================

        }
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
        {
          //= =======================================================================================
/*                                                                                      *
 *                                       Favorites                                      *
 *                                                                                      */
//= =======================================================================================

        }
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
        {
        //= =======================================================================================
/*                                                                                      *
 *                                       Card List                                      *
 *                                                                                      */
//= =======================================================================================
        }
        <Button
          className="expandable"
          hoverIndicator="accent-1"
          plain
          onClick={() => this.expandMiniList()}
        >
          <List color="brand" />
          <Text className="menu-label">Cards</Text>
        </Button>
        <Tooltip
          hoverIndicator="accent-1"
          className="sidebar-tooltip"
          icon={<List color="brand" />}
          title="Cards"
          text="Show a list of your cards"
          onClick={() => {
            this.expandMenu();
            this.expandMiniList();
          }}
        />

        <Box className={classnames('expandable-menu', 'expandable')} background="dark-1">
          <CardList mini open={miniListExpanded} />
        </Box>

        <Box className="bottom-section">
          {
          //= =======================================================================================
/*                                                                                      *
 *                                        Archive                                       *
 *                                                                                      */
//= =======================================================================================

        }
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
          {
          //= =======================================================================================
/*                                                                                      *
 *                                       Settings                                       *
 *                                                                                      */
//= =======================================================================================

        }
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
          {
          //= =======================================================================================
/*                                                                                      *
 *                                       Gist Sync                                      *
 *                                                                                      */
//= =======================================================================================

        }
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
