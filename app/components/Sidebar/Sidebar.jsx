import React, { Component } from 'react';
// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { Box, Text, Collapsible } from 'grommet';
import {
  Filter,
  Brush,
  FormNext,
  FormPrevious,
  Up,
  Descend as Sort,
  FolderCycle,
  AddCircle,
  Checkmark,
  Configure,
} from 'grommet-icons';
import classnames from 'classnames';
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
      whiteMode,
      labelFilters,
      changeSorting,
      addLabelFilter,
      cwd,
      removeLabelFilter,
      sidebarExpanded,
      toggleWhiteMode,
      toggleEditor,
      toggleSettings,
      toggleCompletedFilter,
      completedFilterOn,
      sorting,
      order,
      labels,
      changeCwd,
    } = this.props;
    const { sortingOptionsExpanded, labelFiltersExpanded } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };

    return (
      <Collapsible direction="horizontal" open={sidebarExpanded}>
        <Box direction="column" align="end">
          <Button
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
          >
            <Brush color="brand" />
            <Text className="menu-label">{whiteMode ? 'Dark Theme' : 'Light Theme'}</Text>
          </Button>
          <Button
            onClick={() => {
              toggleEditor(true);
            }}
            className="add-note-btn"
          >
            <AddCircle color="brand" />
            <Text className="menu-label">Add Card</Text>
          </Button>
          <Button
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
            }}
            className={classnames('toggle-completed-button', completedFilterOn && 'active')}
            color={(completedFilterOn && 'accent-3') || 'brand'}
            hoverIndicator={(completedFilterOn && 'brand') || 'accent-1'}
          >
            <Checkmark color={completedFilterOn ? 'accent-3' : 'brand'} />
            <Text className="menu-label">Toggle Completed</Text>
          </Button>
          <Button
            onClick={() => {
              this.expandSortingOptions();
            }}
          >
            <Sort color="brand" className="sort-icon" />
            <Text className="menu-label">Sort Cards </Text>
          </Button>
          <Collapsible direction="vertical" open={sortingOptionsExpanded}>
            <Button
              className={classnames(sorting === SORTING_BY_TITLE && 'active')}
              plain={sorting !== SORTING_BY_TITLE}
              onClick={() => changeSorting(SORTING_BY_TITLE, this.getSortingOrder(SORTING_BY_TITLE))
              }
            >
              <Up
                color="brand"
                className={classnames(order === DESCENDING_ORDER && 'descending')}
              />
              By Title
            </Button>
            <Button
              plain={sorting !== SORTING_BY_DATE}
              onClick={() => changeSorting(SORTING_BY_DATE, this.getSortingOrder(SORTING_BY_DATE))}
              className={classnames(sorting === SORTING_BY_DATE && 'active')}
            >
              <Up
                color="brand"
                className={classnames(order === DESCENDING_ORDER && 'descending')}
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
          <FolderPicker
            label="Change directory"
            placeholder={cwd}
            className="menu-label"
            onChange={(value) => {
              changeCwd(value);
              ipcRenderer.send('CHANGED-CWD');
            }}
          />
          <Box direction="column">
            <Text size="small" className="help">
              Markdown Guide
              <Tooltip text={TooltipData.markdown.text} title={TooltipData.markdown.title} />
            </Text>
            <Text size="small" className="help">
              Keyboard Shortcuts
              <Tooltip text={TooltipData.keyboard.text} title={TooltipData.keyboard.title} />
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
      toggleSettings,
      toggleEditor,
      toggleCompletedFilter,
      completedFilterOn,
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
            icon={<Brush color="brand" />}
            className="sidebar-tooltip"
            title="Set theme"
            text={`Switch to ${whiteMode ? 'dark' : 'white'} theme`}
            onClick={() => {
              toggleWhiteMode(!whiteMode);
            }}
          />
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
            className={classnames(
              'toggle-completed-button',
              'sidebar-tooltip',
              completedFilterOn && 'active',
            )}
            icon={<Checkmark color={completedFilterOn ? 'accent-1' : 'brand'} />}
            title="Toggle completed cards"
            text="Make cards which have already been completed visible"
            onClick={() => {
              toggleCompletedFilter(!completedFilterOn);
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
              this.expandMenu();
              toggleSettings();
            }}
          />
          <Tooltip
            className={classnames('sidebar-tooltip', 'sort-icon')}
            icon={<FolderCycle color="brand" />}
            title="Change Cards Directory"
            text="Change the directory in which your cards live. If you connect it to Dropbox or Google Drive, you can have your cards in multiple devices"
            onClick={() => {
              this.expandMenu();
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
  toggleCompletedFilter: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool,
  completedFilterOn: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  toggleWhiteMode: PropTypes.func.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  cwd: PropTypes.string,
  changeCwd: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
  labels: PropTypes.array,
  sorting: PropTypes.string,
  order: PropTypes.string,
  changeSorting: PropTypes.func.isRequired,
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
