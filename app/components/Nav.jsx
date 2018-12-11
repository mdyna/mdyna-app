import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Brush from 'grommet/components/icons/base/Brush';
import Pulse from 'grommet/components/icons/base/Add';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import Search from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import classnames from 'classnames';
import Image from 'grommet/components/Image';
import LabelFilter from './LabelFilter';
import logo from '../../resources/dynaLogoCircle.png';

import '!style-loader!css-loader!sass-loader!./Nav.scss'; // eslint-disable-line

function getCardTitles(cards) {
  return cards && cards.map(d => d && d.title) || '';
}
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  render() {
    const { cards, whiteMode, labelFilters, addLabelFilter, removeLabelFilter } = this.props;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };
    const titles = [
      ...getCardTitles(cards),
    ];

    return (
      <Box
        full="horizontal"
        justify="start"
        className={classnames('navbar', { 'white-mode': whiteMode })}
        pad="small"
        direction="row"
      >
        <Image src={logo} className="navbar-app-logo" alt="dyna" size="small" />
        <Button
          onClick={() => {
            this.props.toggleWhiteMode(!whiteMode);
          }}
          className="white-mode-button"
        >
          <Brush />
        </Button>
        <Button
          onClick={() => {
            this.props.toggleEditor(true);
          }}
          className="add-note-btn"
        >
          <Pulse />
        </Button>
        <Button
          onClick={() => {
            this.props.toggleCompletedFilter(!this.props.completedFilterOn);
          }}
          className={classnames('toggle-completed-button', {
            active: this.props.completedFilterOn,
          })}
        >
          <CheckmarkIcon />
        </Button>
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
          onSelect={e => this.props.searchCards(e.suggestion)}
          value={this.props.searchInput}
        />
        <LabelFilter
          labels={this.props.labels}
          labelFilters={labelFilters}
          labelFilterFuncs={labelFilterFuncs}
        />
      </Box>
    );
  }
}

NavBar.propTypes = {
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

NavBar.defaultProps = {
  searchInput: '',
  whiteMode: false,
  titles: [],
  completedFilterOn: false,
  labels: [],
};

export default NavBar;
