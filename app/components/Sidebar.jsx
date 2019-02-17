import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Filter from 'grommet/components/icons/base/Filter';
import Brush from 'grommet/components/icons/base/Brush';
import FormNext from 'grommet/components/icons/base/FormNext';
import FormPrevious from 'grommet/components/icons/base/FormPrevious';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import classnames from 'classnames';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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
      expanded: true,
      searchInput: '',
    };
    this.searchBar = React.createRef();
  }

  toggleMenuCollapse() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { cards, whiteMode, labelFilters, addLabelFilter, removeLabelFilter } = this.props;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };
    const titles = [...getCardTitles(cards)];

    return (
      <Box
        full="vertical"
        justify="start"
        className={classnames('sidebar', {
          'white-mode': whiteMode,
          collapsed: !this.state.expanded,
        })}
        pad="small"
        direction="column"
      >
        <KeyboardEventHandler
          handleKeys={['ctrl+p']}
          onKeyEvent={() => this.searchBar.current.focus()}
        />
        <Box direction="row" justify="start" className="menu-item title">
          {this.state.expanded ? (
            <Button onClick={() => this.toggleMenuCollapse()} className="white-mode-button">
              <FormPrevious />
              <Image src={logo} className="sidebar-app-logo" alt="Mdyna" size="small" />
              <Label size="large">mdyna</Label>
            </Button>
          ) : (
            <Button onClick={() => this.toggleMenuCollapse()} className="white-mode-button">
              <FormNext />
            </Button>
          )}
          {this.state.expanded ? (
            <React.Fragment>
            </React.Fragment>
          ) : (
            ''
          )}
        </Box>

        <Box direction="row" justify="start" className="menu-item">
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
        </Box>

        <Box direction="row" justify="start" className="menu-item">
          <Button
            onClick={() => {
              this.props.toggleWhiteMode(!whiteMode);
            }}
            className="white-mode-button"
          >
            <Brush />
            {this.state.expanded ? (
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
            {this.state.expanded ? <Label className="menu-label">Add card</Label> : ''}
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
            {this.state.expanded ? <Label className="menu-label">Toggle Completed</Label> : ''}
          </Button>
        </Box>

        <Box direction="column" className="menu-item-labels">
          <Box direction="row" justify="start" className="menu-item">
            <Filter />
            {this.state.expanded ? <Label className="menu-label">Filter Labels</Label> : ''}
          </Box>
          <LabelFilter
            whiteMode={whiteMode}
            labels={this.props.labels}
            labelFilters={labelFilters}
            labelFilterFuncs={labelFilterFuncs}
          />
        </Box>
      </Box>
    );
  }
}

Sidebar.propTypes = {
  labelFilters: PropTypes.array.isRequired,
  addLabelFilter: PropTypes.func.isRequired,
  toggleCompletedFilter: PropTypes.func.isRequired,
  completedFilterOn: PropTypes.bool,
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
  completedFilterOn: false,
  labels: [],
};

export default Sidebar;
