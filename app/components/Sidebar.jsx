import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Filter from 'grommet/components/icons/base/Filter';
import Brush from 'grommet/components/icons/base/Brush';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import SearchIcon from 'grommet/components/icons/base/Search';
import UpArrow from 'grommet/components/icons/base/LinkUp';
import SortIcon from 'grommet/components/icons/base/Transaction';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Search from 'grommet/components/Search';
import classnames from 'classnames';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import TooltipData from 'UI/tooltipsContent.js';
import LabelFilter from 'UI/LabelFilter';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from 'Utils/globals';

import logo from '../../resources/MdynaLogoCircle.png';

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

  render() {
    const {
      cards,
      whiteMode,
      labelFilters,
      changeSorting,
      addLabelFilter,
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
      searchCards,
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
            setTimeout(() => this.searchBar.current.focus(), 300);
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
              inline
              suggestions={titles.filter(
                d => d && d.toLowerCase().startsWith(searchInput.toLowerCase()),
              )}
              onDOMChange={(e) => {
                searchCards(e.target.value);
                this.setState({
                  searchInput: e.target.value,
                });
              }}
              ref={this.searchBar}
              onSelect={e => searchCards(e.suggestion)}
              value={searchInput}
            />
          ) : (
            <Tooltip
              whiteMode={whiteMode}
              icon={<SearchIcon />}
              title="Search"
              onClick={() => {
                this.expandMenu();
                setTimeout(() => this.searchBar.current.focus(), 300);
              }}
            />
          )}
        </Box>

        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
            className="white-mode-button"
          >
            <Brush />
            {sidebarExpanded ? (
              <Label className="menu-label">{whiteMode ? 'Dark Theme' : 'Light Theme'}</Label>
            ) : (
              ''
            )}
          </Button>
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleEditor(true);
            }}
            className="add-note-btn"
          >
            <Pulse />
            {sidebarExpanded ? <Label className="menu-label">Add Card</Label> : ''}
          </Button>
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
            }}
            className={classnames('toggle-completed-button', {
              active: completedFilterOn,
            })}
          >
            <CheckmarkIcon />
            {sidebarExpanded ? <Label className="menu-label">Toggle Completed</Label> : ''}
          </Button>
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              if (!sidebarExpanded) {
                this.expandMenu();
              }
              this.expandSortingOptions();
            }}
          >
            <SortIcon className="sort-icon" />
            {sidebarExpanded ? <Label className="menu-label">Sort Cards </Label> : ''}
          </Button>
        </Box>
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

        <Box direction="column" className="menu-item-labels">
          <Box direction="row" justify="start" className="menu-item">
            {sidebarExpanded ? (
              <React.Fragment>
                <Filter />
                <Label className="menu-label">Filter Labels</Label>
              </React.Fragment>
            ) : (
              <Button
                onClick={() => {
                  this.expandMenu();
                }}
              >
                <Filter />
              </Button>
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
  labelFilters: PropTypes.array.isRequired,
  addLabelFilter: PropTypes.func.isRequired,
  toggleCompletedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  completedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  toggleWhiteMode: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
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
  sidebarExpanded: false,
  completedFilterOn: false,
  sorting: SORTING_BY_DATE,
  order: DESCENDING_ORDER,
  labels: [],
};

export default Sidebar;
