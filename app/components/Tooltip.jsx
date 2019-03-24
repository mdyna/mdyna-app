import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from 'grommet/components/icons/base/Help';
import Box from 'grommet/components/Box';
import CardItem from './Cards/CardItem';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import '!style-loader!css-loader!sass-loader!./Tooltip.scss'; // eslint-disable-line

class Tooltip extends Component {
  state = {
    show: true,
  };

  showTooltip() {
    this.setState({ show: true });
  }

  hideTooltip() {
    this.setState({ show: false });
  }

  render() {
    const { text, color, title, whiteMode } = this.props;

    return (
      <React.Fragment>
        <Box
          data-tip
          data-for={title}
          onMouseEnter={() => this.showTooltip()}
          onMouseLeave={() => this.hideTooltip()}
          className={cx('tip-icon', whiteMode && 'white-mode')}
        >
          <HelpIcon />
        </Box>
        <ReactTooltip id={title} class="tooltip" />
      </React.Fragment>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  whiteMode: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  show: false,
  title: 'help',
  color: '#a7ffeb',
};
