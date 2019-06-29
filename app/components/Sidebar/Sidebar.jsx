import React, { Component } from 'react';
// eslint-disable-next-line
import { ipcRenderer } from "electron";
import PropTypes from 'prop-types';
import { Box, Text, Collapsible } from 'grommet';
import {
  Filter,
  Brush,
  FormNext,
  FormPrevious,
  Search,
  Up,
  Sort,
  FolderCycle,
  AddCircle,
  Checkmark,
} from 'grommet-icons';
import classnames from 'classnames';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import FolderPicker from 'UI/FolderPicker';
import LabelFilter from 'UI/LabelFilter';
import TooltipData from 'UI/tooltipsContent';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from 'Utils/globals';

import SearchInput from './Search';
import "./Sidebar.scss"; // eslint-disable-line

function getCardTitles(cards) {
  return (cards && cards.map(d => d && d.title)) || '';
}
class Sidebar extends Component {
  state = {
    searchInput: '',
    sortingOptionsExpanded: false,
  };

  searchBar = React.createRef();

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

  expandSortingOptions() {
    const { sortingOptionsExpanded } = this.state;
    this.setState({
      sortingOptionsExpanded: !sortingOptionsExpanded,
    });
  }

  changeSearchInput(value) {
    const { searchCards } = this.props;

    this.setState({
      searchInput: value,
    });
    searchCards(value);
  }


  collapsibleSidebar() {
    const {
      cards,
      whiteMode,
      labelFilters,
      changeSorting,
      addLabelFilter,
      cwd,
      removeLabelFilter,
      sidebarExpanded,
      toggleWhiteMode,
      toggleEditor,
      toggleCompletedFilter,
      completedFilterOn,
      sorting,
      order,
      labels,
      changeCwd,
    } = this.props;
    const { searchInput, sortingOptionsExpanded } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };
    const titles = [...getCardTitles(cards)];

    return (
      <Collapsible direction="horizontal" open={sidebarExpanded}>
        <Box direction="column" align="end">
          <SearchInput
            titles={titles}
            whiteMode={whiteMode}
            onChange={e => this.changeSearchInput(e)}
            searchBar={this.searchBar}
            searchInput={searchInput}
          />
          <Button
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
          >
            <Brush />
            <Text className="menu-label">
              {whiteMode ? 'Dark Theme' : 'Light Theme'}
            </Text>
          </Button>
          <Button
            onClick={() => {
              toggleEditor(true);
            }}
            className="add-note-btn"
          >
            <AddCircle />
            <Text className="menu-label">Add Card</Text>
          </Button>
          <Button
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
            }}
            className={classnames(
              'toggle-completed-button',
              completedFilterOn && 'active',
            )}
          >
            <Checkmark />
            <Text className="menu-label">Toggle Completed</Text>
          </Button>
          <Button
            onClick={() => {
              this.expandSortingOptions();
            }}
          >
            <Sort className="sort-icon" />
            <Text className="menu-label">Sort Cards </Text>
          </Button>
          <Collapsible direction="vertical" open={sortingOptionsExpanded}>
            <Button
              className={classnames(
                sorting === SORTING_BY_TITLE && 'active',
              )}
              onClick={() => changeSorting(
                SORTING_BY_TITLE,
                this.getSortingOrder(SORTING_BY_TITLE),
              )
              }
            >
              <Up
                className={classnames(
                  order === DESCENDING_ORDER && 'descending',
                )}
              />
              By Title
            </Button>
            <Button
              onClick={() => changeSorting(
                SORTING_BY_DATE,
                this.getSortingOrder(SORTING_BY_DATE),
              )
              }
              className={classnames(
                sorting === SORTING_BY_DATE && 'active',
              )}
            >
              <Up
                className={classnames(
                  order === DESCENDING_ORDER && 'descending',
                )}
              />
              By Date
            </Button>
          </Collapsible>
          <FolderPicker
            label="Change directory"
            placeholder={cwd}
            className="menu-label"
            whiteMode={whiteMode}
            onChange={(value) => {
              changeCwd(value);
              ipcRenderer.send('CHANGED-CWD');
            }}
          />
          <Box direction="column" className="menu-label-filter">
            <Filter />
            <Text className="menu-label">Filter Labels</Text>
            <LabelFilter
              whiteMode={whiteMode}
              labels={labels}
              labelFilters={labelFilters}
              labelFilterFuncs={labelFilterFuncs}
            />
          </Box>
          <Box direction="column">
            <Text size="small" className="help">
              Markdown Guide
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.markdown.text}
                title={TooltipData.markdown.title}
              />
            </Text>
            <Text size="small" className="help">
              Keyboard Shortcuts
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.keyboard.text}
                title={TooltipData.keyboard.title}
              />
            </Text>
            <Text size="small">{window.appVersion}</Text>
          </Box>
        </Box>
      </Collapsible>
    );
  }

  render() {
    const {
      whiteMode,
      sidebarExpanded,
      toggleSidebar,
      toggleWhiteMode,
      toggleEditor,
      toggleCompletedFilter,
      completedFilterOn,
    } = this.props;

    return (
      <React.Fragment>

        <KeyboardEventHandler
          handleKeys={['ctrl+p']}
          onKeyEvent={() => {
            if (!sidebarExpanded) {
              this.expandMenu();
            }
            setTimeout(() => this.searchBar.current.componentRef.focus(), 300);
          }}
        />
        <Box
          className={classnames(whiteMode && 'white-mode', 'sidebar', sidebarExpanded && 'expanded')}
          direction="column"
          alignContent="end"
        >
          <Box direction="row" className="menu-controller">
            {sidebarExpanded ? (
              <Button onClick={() => toggleSidebar()} className="title-button">
                <FormPrevious />
                <Text size="large">mdyna</Text>
              </Button>
            ) : (
              <Button onClick={() => toggleSidebar()} className="title-button">
                <FormNext />
              </Button>
            )}
          </Box>
          <Tooltip
            whiteMode={whiteMode}
            icon={<Search />}
            title="Search"
            className="sidebar-tooltip"
            text="Hotkey: Ctrl+P"
            onClick={() => {
              this.expandMenu();
              setTimeout(
                () => this.searchBar.current.componentRef.focus(),
                300,
              );
            }}
          />
          <Tooltip
            whiteMode={whiteMode}
            icon={<Brush />}
            className="sidebar-tooltip"
            title="Set theme"
            text={`Switch to ${whiteMode ? 'dark' : 'white'} theme`}
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
          />
          <Tooltip
            whiteMode={whiteMode}
            icon={<AddCircle />}
            className={classnames('sidebar-tooltip', 'add-note-btn')}
            title="Add card"
            text="Hotkey: A"
            onClick={() => {
              toggleEditor(true);
            }}
          />
          <Tooltip
            className={classnames(
              'toggle-completed-button',
              'sidebar-tooltip',
              completedFilterOn && 'active',
            )}
            whiteMode={whiteMode}
            icon={<Checkmark />}
            title="Toggle completed cards"
            text="Make cards which have already been completed visible"
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
            }}
          />
          <Tooltip
            className={classnames('sidebar-tooltip', 'sort-icon')}
            whiteMode={whiteMode}
            icon={<Sort />}
            title="Sort cards"
            text="Open sorting options"
            onClick={() => {
              this.expandMenu();
              setTimeout(() => this.expandSortingOptions(), 300);
            }}
          />
          <Tooltip
            className={classnames('sidebar-tooltip', 'sort-icon')}
            whiteMode={whiteMode}
            icon={<FolderCycle />}
            title="Change Cards Directory"
            text="Change the directory in which your cards live. If you connect it to Dropbox or Google Drive, you can have your cards in multiple devices"
            onClick={() => {
              this.expandMenu();
            }}
          />
          <Tooltip
            className="sidebar-tooltip"
            whiteMode={whiteMode}
            icon={<Filter />}
            title="Filter cards"
            text="Filter cards by label"
            onClick={() => {
              this.expandMenu();
            }}
          />
          {this.collapsibleSidebar()}
        </Box>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  labelFilters: PropTypes.array,
  addLabelFilter: PropTypes.func.isRequired,
  toggleCompletedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  completedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  toggleWhiteMode: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  cwd: PropTypes.string,
  changeCwd: PropTypes.func.isRequired,
  searchCards: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  labels: PropTypes.array,
  sorting: PropTypes.string,
  order: PropTypes.string,
  changeSorting: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
};

Sidebar.defaultProps = {
  whiteMode: false,
  labelFilters: [],
  sidebarExpanded: false,
  completedFilterOn: false,
  sorting: SORTING_BY_DATE,
  cwd: '',
  order: DESCENDING_ORDER,
  labels: [],
};

export default Sidebar;
