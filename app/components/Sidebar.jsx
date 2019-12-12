import React, { Component } from 'react';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
// eslint-disable-next-line
import SVG from 'react-inlinesvg';
import Logo from 'Assets/logo.svg';
import PropTypes from 'prop-types';
import { Box, Text, Collapsible } from 'grommet';
import {
  Filter,
  FormNext,
  FormPrevious,
  Up,
  Descend as Sort,
  AddCircle,
  Archive,
  Pin,
  Configure,
} from 'grommet-icons';
import BoardsIcon from 'UI/BoardsIcon';
import classnames from 'classnames';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import GistSync from 'Containers/GistSync';
import Favs from 'Containers/Favs';
import LabelFilter from 'UI/LabelFilter';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from 'Utils/globals';

import './Sidebar.scss';

class Sidebar extends Component {
  state = {
    sortingOptionsExpanded: false,
    favsExpanded: false,
    labelFiltersExpanded: false,
  };

  getSortingOrder = (targetSorting) => {
    const { sorting, order } = this.props;
    const activeSorting = sorting;
    if (targetSorting === activeSorting) {
      return order === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    }
    return ASCENDING_ORDER;
  };

  expandMenu() {
    const { toggleSidebar } = this.props;
    toggleSidebar();
  }

  expandLabelFilters() {
    const { labelFiltersExpanded } = this.state;
    this.setState({
      labelFiltersExpanded: !labelFiltersExpanded,
    });
  }

  expandSortingOptions() {
    const { sortingOptionsExpanded } = this.state;
    this.setState({
      sortingOptionsExpanded: !sortingOptionsExpanded,
    });
  }

  expandFavs() {
    const { favsExpanded } = this.state;
    this.setState({
      favsExpanded: !favsExpanded,
    });
  }

  expandedSidebar() {
    const {
      labelFilters,
      changeSorting,
      addLabelFilter,
      removeLabelFilter,
      sidebarExpanded,
      addCard,
      toggleBoardsDialog,
      toggleSettings,
      activeBoard,
      toggleArchivedFilter,
      archivedFilterOn,
      sorting,
      order,
      labels,
    } = this.props;
    const {
      sortingOptionsExpanded,
      labelFiltersExpanded,
      favsExpanded,
    } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };

    return (
      <Box
        style={{ display: sidebarExpanded ? 'initial' : 'none', width: '100%' }}
      >
        <Box direction="column" align="end">
          <Button
            hoverIndicator="accent-1"
            onClick={() => addCard(activeBoard)}
            className="add-note-btn"
          >
            <AddCircle color="brand" />
            <Text className="menu-label">Add Card</Text>
          </Button>
          <Button
            hoverIndicator="accent-1"
            onClick={() => toggleBoardsDialog()}
          >
            <BoardsIcon color="brand" />
            <Text className="menu-label">Boards</Text>
          </Button>

          <Button
            hoverIndicator="accent-1"
            plain
            onClick={() => this.expandFavs()}
          >
            <Pin color="brand" />
            <Text className="menu-label">Favorites</Text>
          </Button>
          <Box className="expandable-menu" background="dark-1">
            <Collapsible direction="vertical" open={favsExpanded}>
              <Favs />
            </Collapsible>
          </Box>
          <Button
            onClick={() => toggleArchivedFilter(!archivedFilterOn)}
            color={(archivedFilterOn && 'accent-3') || 'brand'}
            hoverIndicator="accent-1"
          >
            <Archive color={archivedFilterOn ? 'accent-3' : 'brand'} />
            <Text className="menu-label">Archive</Text>
          </Button>
          <Button
            hoverIndicator="accent-1"
            onClick={() => this.expandSortingOptions()}
          >
            <Sort color="brand" className="sort-icon" />
            <Text className="menu-label">Sort Cards </Text>
          </Button>

          <Box className="expandable-menu sorting-options" background="dark-1">
            <Collapsible direction="vertical" open={sortingOptionsExpanded}>
              <Button
                color={(sorting === SORTING_BY_TITLE && 'accent-3') || 'brand'}
                hoverIndicator="accent-1"
                onClick={() => changeSorting(
                  SORTING_BY_TITLE,
                  this.getSortingOrder(SORTING_BY_TITLE),
                )
                }
              >
                <Up
                  color={
                    (sorting === SORTING_BY_TITLE && 'accent-3') || 'brand'
                  }
                  className={classnames(
                    order === DESCENDING_ORDER && 'descending',
                  )}
                />
                By Title
              </Button>
              <Button
                hoverIndicator="accent-1"
                onClick={() => changeSorting(
                  SORTING_BY_DATE,
                  this.getSortingOrder(SORTING_BY_DATE),
                )
                }
                color={(sorting === SORTING_BY_DATE && 'accent-3') || 'brand'}
              >
                <Up
                  color={(sorting === SORTING_BY_DATE && 'accent-3') || 'brand'}
                  className={classnames(
                    order === DESCENDING_ORDER && 'descending',
                  )}
                />
                By Date
              </Button>
            </Collapsible>
          </Box>
          <Button
            hoverIndicator="accent-1"
            plain
            onClick={() => toggleSettings()}
          >
            <Configure color="brand" />
            <Text className="menu-label">Settings</Text>
          </Button>
          <Button
            hoverIndicator="accent-1"
            plain
            onClick={() => this.expandLabelFilters()}
          >
            <Filter color="brand" />
            <Text className="menu-label">Filter Labels</Text>
          </Button>
          <Box className="expandable-menu" background="dark-1">
            <Collapsible direction="vertical" open={labelFiltersExpanded}>
              <LabelFilter
                labels={labels}
                labelFilters={labelFilters}
                labelFilterFuncs={labelFilterFuncs}
              />
            </Collapsible>
          </Box>

          <GistSync
            onClick={() => {
              toggleSettings();
            }}
          />
          <Box direction="column">
            <Text size="small" className="help">
              Keyboard Shortcuts
              <Tooltip data="keyboard-shortcuts" />
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  render() {
    const {
      sidebarExpanded,
      toggleSidebar,
      toggleSettings,
      addCard,
      toggleArchivedFilter,
      toggleBoardsDialog,
      activeBoard,
      archivedFilterOn,
    } = this.props;

    return (
      <React.Fragment>
        <Box
          className={classnames('sidebar', sidebarExpanded && 'expanded')}
          direction="column"
          alignContent="end"
          background="dark-2"
        >
          <Box direction="row" className="menu-controller">
            {sidebarExpanded ? (
              <Button
                hoverIndicator="accent-1"
                onClick={() => toggleSidebar()}
                className="title-button"
              >
                <FormPrevious color="brand" />
                <Text size="large">
                  <SVG src={Logo} style={{ width: 32 }} />
                  MDyna
                </Text>
              </Button>
            ) : (
              <Button
                hoverIndicator="accent-1"
                onClick={() => toggleSidebar()}
                className="title-button"
              >
                <FormNext color="brand" />
              </Button>
            )}
          </Box>
          <Box
            direction="column"
            style={{ display: !sidebarExpanded ? 'initial' : 'none' }}
          >
            <Tooltip
              icon={<AddCircle color="brand" />}
              className={classnames('sidebar-tooltip', 'add-note-btn')}
              title="Add card"
              text="Add card (Use 'A' hotkey)"
              onClick={() => {
                addCard(activeBoard);
              }}
            />
            <Tooltip
              icon={<BoardsIcon color="brand" />}
              className="sidebar-tooltip"
              title="Manage boards"
              text="Add, delete or edit boards"
              onClick={() => {
                toggleBoardsDialog();
              }}
            />
            <Tooltip
              className="sidebar-tooltip"
              icon={<Pin color="brand" />}
              title="Favorites"
              text="Open your favorites and quickly focus on them"
              onClick={() => {
                this.expandMenu();
                this.expandFavs();
              }}
            />
            <Tooltip
              className="sidebar-tooltip"
              icon={<Archive color={archivedFilterOn ? 'accent-3' : 'brand'} />}
              title="Show Archive"
              text="See your archived cards"
              onClick={() => {
                toggleArchivedFilter(!archivedFilterOn);
              }}
            />
            <Tooltip
              className={classnames('sidebar-tooltip', 'sort-icon')}
              icon={<Sort color="brand" />}
              title="Sort cards"
              text="Open sorting options"
              onClick={() => {
                this.expandMenu();
                this.expandSortingOptions();
              }}
            />
            <Tooltip
              className="sidebar-tooltip"
              icon={<Configure color="brand" />}
              title="Settings"
              text="Open MDyna settings interface"
              onClick={() => {
                toggleSettings();
              }}
            />
            <Tooltip
              className="sidebar-tooltip"
              icon={<Filter color="brand" />}
              title="Filter cards"
              text="Filter cards by label"
              onClick={() => {
                this.expandMenu();
                this.expandLabelFilters();
              }}
            />
          </Box>
          {!sidebarExpanded && (
            <GistSync
              badge
              skipLogin
              classname="sidebar-tooltip"
              onClick={() => {
                toggleSettings();
              }}
            />
          )}
          {this.expandedSidebar()}
        </Box>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  labelFilters: PropTypes.array,
  addLabelFilter: PropTypes.func.isRequired,
  toggleArchivedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  archivedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  activeBoard: PropTypes.string,
  toggleSettings: PropTypes.func.isRequired,
  labels: PropTypes.array,
  sorting: PropTypes.string,
  order: PropTypes.string,
  changeSorting: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  labelFilters: [],
  sidebarExpanded: false,
  activeBoard: 'INBOX',
  archivedFilterOn: false,
  sorting: SORTING_BY_DATE,
  order: DESCENDING_ORDER,
  labels: [],
};

export default Sidebar;
