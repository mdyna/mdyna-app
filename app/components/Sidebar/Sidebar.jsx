import React, { Component } from 'react';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Filter from 'grommet/components/icons/base/Filter';
import Brush from 'grommet/components/icons/base/Brush';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import SearchIcon from 'grommet/components/icons/base/Search';
import UpArrow from 'grommet/components/icons/base/LinkUp';
import SortIcon from 'grommet/components/icons/base/Transaction';
import FolderCycleIcon from 'grommet/components/icons/base/FolderCycle';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import classnames from 'classnames';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
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

import logo from '../../../resources/MdynaLogoCircle.png';

import Search from './Search';
import './Sidebar.scss'; // eslint-disable-line

function getCardTitles(cards) {
  return (cards && cards.map(d => d && d.title)) || '';
}
class Sidebar extends Component {
  state = {
    searchInput: '',
    sortingOptionsExpanded: false,
  };

  searchBar = React.createRef();

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
    const {searchCards} = this.props;

    this.setState({
      searchInput: value,
    });
    searchCards(value);
  }

  render() {
    const {
      cards,
      whiteMode,
      labelFilters,
      changeSorting,
      addLabelFilter,
      cwd,
      removeLabelFilter,
      sidebarExpanded,
      toggleSidebar,
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

    const getSortingOrder = (targetSorting) => {
      const activeSorting = sorting;
      if (targetSorting === activeSorting) {
        return order === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
      }
      return ASCENDING_ORDER;
    };

    return (
      <Box
        full="vertical"
        justify="start"
        className={classnames('sidebar', {
          'white-mode': whiteMode,
          collapsed: !sidebarExpanded,
        })}
        pad="small"
        direction="column"
      >
        <KeyboardEventHandler
          handleKeys={['ctrl+p']}
          onKeyEvent={() => {
            if (!sidebarExpanded) {
              this.expandMenu();
            }
            setTimeout(() => this.searchBar.current.componentRef.focus(), 300);
          }}
        />
        <Box direction="row" justify="start" className="menu-item title">
          {sidebarExpanded ? (
            <Button onClick={() => toggleSidebar()} className="title-button">
              <FormPrevious />
              <Image src={logo} className="sidebar-app-logo" alt="Mdyna" size="small" />
              <Label size="large">mdyna</Label>
            </Button>
          ) : (
            <Button onClick={() => toggleSidebar()} className="title-button">
              <FormNext />
            </Button>
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Search
              titles={titles}
              whiteMode={whiteMode}
              onChange={e => this.changeSearchInput(e)}
              searchBar={this.searchBar}
              searchInput={searchInput}
            />
          ) : (
            <Tooltip
              whiteMode={whiteMode}
              icon={<SearchIcon />}
              title="Search"
              className="sidebar-tooltip"
              text="Hotkey: Ctrl+P"
              onClick={() => {
                this.expandMenu();
                setTimeout(() => this.searchBar.current.componentRef.focus(), 300);
              }}
            />
          )}
        </Box>

        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Button
              onClick={() => {
                toggleWhiteMode(!whiteMode);
              }}
            >
              <Brush />
              <Label className="menu-label">{whiteMode ? 'Dark Theme' : 'Light Theme'}</Label>
            </Button>
          ) : (
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
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Button
              onClick={() => {
                toggleEditor(true);
              }}
              className="add-note-btn"
            >
              <Pulse />
              <Label className="menu-label">Add Card</Label>
            </Button>
          ) : (
            <Tooltip
              whiteMode={whiteMode}
              icon={<Pulse />}
              className={classnames('sidebar-tooltip', 'add-note-btn')}
              title="Add card"
              text="Hotkey: A"
              onClick={() => {
                toggleEditor(true);
              }}
            />
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Button
              onClick={() => {
                toggleCompletedFilter(!completedFilterOn);
              }}
              className={classnames('toggle-completed-button', completedFilterOn && 'active')}
            >
              <CheckmarkIcon />
              <Label className="menu-label">Toggle Completed</Label>
            </Button>
          ) : (
            <Tooltip
              className={classnames(
                'toggle-completed-button',
                'sidebar-tooltip',
                completedFilterOn && 'active',
              )}
              whiteMode={whiteMode}
              icon={<CheckmarkIcon />}
              title="Toggle completed cards"
              text="Make cards which have already been completed visible"
              onClick={() => {
                toggleCompletedFilter(!completedFilterOn);
              }}
            />
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Button
              onClick={() => {
                this.expandSortingOptions();
              }}
            >
              <SortIcon className="sort-icon" />
              <Label className="menu-label">Sort Cards </Label>
            </Button>
          ) : (
            <Tooltip
              className={classnames('sidebar-tooltip', 'sort-icon')}
              whiteMode={whiteMode}
              icon={<SortIcon />}
              title="Sort cards"
              text="Open sorting options"
              onClick={() => {
                this.expandMenu();
                setTimeout(() => this.expandSortingOptions(), 300);
              }}
            />
          )}
        </Box>
        {sidebarExpanded && (
          <Box
            direction="column"
            className={classnames(sortingOptionsExpanded && 'expanded', 'sorting-table')}
          >
            <Button
              className={classnames(sorting === SORTING_BY_TITLE && 'active-sorting')}
              onClick={() => changeSorting(SORTING_BY_TITLE, getSortingOrder(SORTING_BY_TITLE))}
            >
              <UpArrow className={classnames(order === DESCENDING_ORDER && 'descending')} />
              By Title
            </Button>
            <Button
              onClick={() => changeSorting(SORTING_BY_DATE, getSortingOrder(SORTING_BY_DATE))}
              className={classnames(sorting === SORTING_BY_DATE && 'active-sorting')}
            >
              <UpArrow className={classnames(order === DESCENDING_ORDER && 'descending')} />
              By Date
            </Button>
          </Box>
        )}

        <Box direction="column" className="menu-item-labels">
          {(sidebarExpanded && (
            <FolderPicker
              label="Change directory"
              placeholder={cwd}
              whiteMode={whiteMode}
              onChange={(value) => {
                changeCwd(value);
                ipcRenderer.send('CHANGED-CWD');
              }}
            />
          )) || (
            <Tooltip
              className={classnames('sidebar-tooltip', 'sort-icon')}
              whiteMode={whiteMode}
              icon={<FolderCycleIcon />}
              title="Change Cards Directory"
              text="Change the directory in which your cards live. If you connect it to Dropbox or Google Drive, you can have your cards in multiple devices"
              onClick={() => {
                this.expandMenu();
              }}
            />
          )}
          <Box direction="row" justify="start" className="menu-item">
            {sidebarExpanded ? (
              <React.Fragment>
                <Filter />
                <Label className="menu-label-filter">Filter Labels</Label>
              </React.Fragment>
            ) : (
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
            )}
          </Box>
          {sidebarExpanded ? (
            <LabelFilter
              whiteMode={whiteMode}
              labels={labels}
              labelFilters={labelFilters}
              labelFilterFuncs={labelFilterFuncs}
            />
          ) : (
            ''
          )}
        </Box>
        {sidebarExpanded && (
          <Box className="sidebar-footer">
            <Label size="small">
              Markdown Guide
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.markdown.text}
                title={TooltipData.markdown.title}
              />
            </Label>
            <Label size="small">
              Keyboard Shortcuts
              <Tooltip
                whiteMode={whiteMode}
                text={TooltipData.keyboard.text}
                title={TooltipData.keyboard.title}
              />
            </Label>
            <Label size="small">{window.appVersion}</Label>
          </Box>
        )}
      </Box>
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
  cwd: PropTypes.string.isRequired,
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
  order: DESCENDING_ORDER,
  labels: [],
};

export default Sidebar;
