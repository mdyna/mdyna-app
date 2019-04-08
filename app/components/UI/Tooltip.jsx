import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HelpIcon from 'grommet/components/icons/base/Help';
import Box from 'grommet/components/Box';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import './Tooltip.scss'; // eslint-disable-line

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

  renderTooltipContent() {
    const { text, title } = this.props;
    return `
      <h3>
        ${title}
      </h3>
      <div className="tooltip-text">
        ${text}
      </div>
      `;
  }

  render() {
    const { title, whiteMode } = this.props;

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
        <ReactTooltip
          id={title}
          place="top"
          class={cx('tooltip', whiteMode && 'white-mode')}
          multiline
          offset={{
            left: 20,
          }}
          html
        >
          {this.renderTooltipContent()}
        </ReactTooltip>
      </React.Fragment>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  whiteMode: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  show: false,
  title: 'help',
};
