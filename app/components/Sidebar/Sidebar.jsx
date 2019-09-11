import React, { Component } from 'react';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { Box, Text, Collapsible } from 'grommet';
import {
  Filter,
  FormNext,
  FormPrevious,
  Up,
  Projects,
  Descend as Sort,
  AddCircle,
  Archive,
  Configure,
} from 'grommet-icons';
import classnames from 'classnames';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import LabelFilter from 'UI/LabelFilter';
import TooltipData from 'UI/tooltipsContent';
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

  collapsibleSidebar() {
    const {
      labelFilters,
      changeSorting,
      addLabelFilter,
      removeLabelFilter,
      sidebarExpanded,
      toggleEditor,
      toggleBoardsDialog,
      toggleSettings,
      toggleArchivedFilter,
      archivedFilterOn,
      sorting,
      order,
      labels,
    } = this.props;
    const { sortingOptionsExpanded, labelFiltersExpanded } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };

    return (
      <Collapsible direction="horizontal" open={sidebarExpanded}>
        <Box direction="column" align="end">
          <Button onClick={() => toggleEditor(true)} className="add-note-btn">
            <AddCircle color="brand" />
            <Text className="menu-label">Add Card</Text>
          </Button>
          <Button onClick={() => toggleBoardsDialog()}>
            <Projects color="brand" />
            <Text className="menu-label">Boards</Text>
          </Button>
          <Button
            onClick={() => toggleArchivedFilter(!archivedFilterOn)}
            color={(archivedFilterOn && 'accent-3') || 'brand'}
            hoverIndicator={(archivedFilterOn && 'brand') || 'accent-1'}
          >
            <Archive color={archivedFilterOn ? 'accent-3' : 'brand'} />
            <Text className="menu-label">Archive</Text>
          </Button>
          <Button onClick={() => this.expandSortingOptions()}>
            <Sort color="brand" className="sort-icon" />
            <Text className="menu-label">Sort Cards </Text>
          </Button>
          <Collapsible direction="vertical" open={sortingOptionsExpanded}>
            <Button
              className={classnames(sorting === SORTING_BY_TITLE && 'active')}
              plain={sorting !== SORTING_BY_TITLE}
              onClick={() => changeSorting(
                SORTING_BY_TITLE,
                this.getSortingOrder(SORTING_BY_TITLE),
              )
              }
            >
              <Up
                color="brand"
                className={classnames(
                  order === DESCENDING_ORDER && 'descending',
                )}
              />
              By Title
            </Button>
            <Button
              plain={sorting !== SORTING_BY_DATE}
              onClick={() => changeSorting(
                SORTING_BY_DATE,
                this.getSortingOrder(SORTING_BY_DATE),
              )
              }
              className={classnames(sorting === SORTING_BY_DATE && 'active')}
            >
              <Up
                color="brand"
                className={classnames(
                  order === DESCENDING_ORDER && 'descending',
                )}
              />
              By Date
            </Button>
          </Collapsible>
          <Button plain onClick={() => toggleSettings()}>
            <Configure color="brand" />
            <Text className="menu-label">Settings</Text>
          </Button>
          <Button plain onClick={() => this.expandLabelFilters()}>
            <Filter color="brand" />
            <Text className="menu-label">Filter Labels</Text>
          </Button>

          <Collapsible direction="vertical" open={labelFiltersExpanded}>
            <LabelFilter
              labels={labels}
              labelFilters={labelFilters}
              labelFilterFuncs={labelFilterFuncs}
            />
          </Collapsible>
          <Box direction="column">
            <Text size="small" className="help">
              Markdown Guide
              <Tooltip
                text={TooltipData.markdown.text}
                title={TooltipData.markdown.title}
              />
            </Text>
            <Text size="small" className="help">
              Keyboard Shortcuts
              <Tooltip
                text={TooltipData.keyboard.text}
                title={TooltipData.keyboard.title}
              />
            </Text>
          </Box>
        </Box>
      </Collapsible>
    );
  }

  render() {
    const {
      sidebarExpanded,
      toggleSidebar,
      toggleSettings,
      toggleEditor,
      toggleArchivedFilter,
      toggleBoardsDialog,
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
              <Button onClick={() => toggleSidebar()} className="title-button">
                <FormPrevious color="brand" />
                <Text size="large">mdyna</Text>
              </Button>
            ) : (
              <Button onClick={() => toggleSidebar()} className="title-button">
                <FormNext color="brand" />
              </Button>
            )}
          </Box>
          <Tooltip
            icon={<AddCircle color="brand" />}
            className={classnames('sidebar-tooltip', 'add-note-btn')}
            title="Add card"
            text="Hotkey: A"
            onClick={() => {
              toggleEditor(true);
            }}
          />
          <Tooltip
            icon={<Projects color="brand" />}
            className={classnames('sidebar-tooltip')}
            title="Manage boards"
            text="Add, delete or edit boards"
            onClick={() => {
              toggleBoardsDialog();
            }}
          />
          <Tooltip
            className="sidebar-tooltip"
            icon={<Archive color={archivedFilterOn ? 'accent-1' : 'brand'} />}
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
            className={classnames('sidebar-tooltip')}
            icon={<Configure color="brand" />}
            title="Settings"
            text="Open mdyna settings UI"
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
  toggleArchivedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  archivedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  toggleSettings: PropTypes.func.isRequired,
  labels: PropTypes.array,
  sorting: PropTypes.string,
  order: PropTypes.string,
  changeSorting: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  labelFilters: [],
  sidebarExpanded: false,
  archivedFilterOn: false,
  sorting: SORTING_BY_DATE,
  order: DESCENDING_ORDER,
  labels: [],
};

export default Sidebar;
