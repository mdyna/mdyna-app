import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from 'grommet/components/icons/base/Help';
import Box from 'grommet/components/Box';
import CardItem from './Cards/CardItem';

class Tooltip extends Component {
  state = {
    show: false,
  };

  showTooltip() {
    this.setState({ show: true });
  }

  hideTooltip() {
    this.setState({ show: false });
  }

  render() {
    const { text, color, title} = this.props;
    console.log('rendering', text)

    return (
      <Box onMouseEnter={() => this.showTooltip()} onMouseLeave={() => this.hideTooltip()} className="tip-icon">
        <HelpIcon />
        {this.state.show ? (
          <CardItem className="tooltip" card={{ text, color, title }} showAllText />
        ) : (
          ''
        )}
      </Box>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  show: false,
  title: 'help',
  color: '#a7ffeb',
};
