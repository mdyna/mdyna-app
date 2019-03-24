import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Filter from 'grommet/components/icons/base/Filter';
import Brush from 'grommet/components/icons/base/Brush';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import SearchIcon from 'grommet/components/icons/base/Search';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import classnames from 'classnames';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Tooltip from './Tooltip';
import LabelFilter from './LabelFilter';

import logo from '../../resources/MdynaLogoCircle.png';

import '!style-loader!css-loader!sass-loader!./Sidebar.scss'; // eslint-disable-line

function getCardTitles(cards) {
  return (cards && cards.map(d => d && d.title)) || '';
}
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.searchBar = React.createRef();
  }

  expandMenu() {
    this.props.toggleSidebar();
  }

  render() {
    const {
      cards,
      whiteMode,
      labelFilters,
      addLabelFilter,
      removeLabelFilter,
      sidebarExpanded,
    } = this.props;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };
    const titles = [...getCardTitles(cards)];

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
          onKeyEvent={() => this.searchBar.current.focus()}
        />
        <Box direction="row" justify="start" className="menu-item title">
          {sidebarExpanded ? (
            <Button onClick={() => this.props.toggleSidebar()} className="title-button">
              <FormPrevious />
              <Image src={logo} className="sidebar-app-logo" alt="Mdyna" size="small" />
              <Label size="large">mdyna</Label>
            </Button>
          ) : (
            <Button onClick={() => this.props.toggleSidebar()} className="title-button">
              <FormNext />
            </Button>
          )}
        </Box>
        <Box direction="row" justify="start" className="menu-item">
          {sidebarExpanded ? (
            <Search
              inline
              suggestions={titles.filter(
                d => d && d.toLowerCase().startsWith(this.state.searchInput.toLowerCase()),
              )}
              onDOMChange={(e) => {
                this.props.searchCards(e.target.value);
                this.setState({
                  searchInput: e.target.value,
                });
              }}
              ref={this.searchBar}
              onSelect={e => this.props.searchCards(e.suggestion)}
              value={this.props.searchInput}
            />
          ) : (
            <Button
              onClick={() => {
                this.expandMenu();
                setTimeout(() => this.searchBar.current.focus(), 500);
              }}
            >
              <SearchIcon />
            </Button>
          )}
        </Box>

        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              this.props.toggleWhiteMode(!whiteMode);
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
              this.props.toggleEditor(true);
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
              this.props.toggleCompletedFilter(!this.props.completedFilterOn);
            }}
            className={classnames('toggle-completed-button', {
              active: this.props.completedFilterOn,
            })}
          >
            <CheckmarkIcon />
            {sidebarExpanded ? <Label className="menu-label">Toggle Completed</Label> : ''}
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
              labels={this.props.labels}
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
              {window.appVersion}
            </Label>
            <Label size="small">
              Keyboard shortcuts
              <Tooltip whiteMode={whiteMode} text="Alt + Enter => Save Draft" title="Keyboard shortcuts" />
            </Label>
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
  searchInput: PropTypes.string,
  whiteMode: PropTypes.bool,
  labels: PropTypes.array,
  cards: PropTypes.array.isRequired,
};

Sidebar.defaultProps = {
  searchInput: '',
  whiteMode: false,
  titles: [],
  sidebarExpanded: false,
  completedFilterOn: false,
  labels: [],
};

export default Sidebar;
