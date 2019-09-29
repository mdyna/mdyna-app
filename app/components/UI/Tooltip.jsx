import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Help } from 'grommet-icons';
import { Box } from 'grommet';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import './Tooltip.scss'; // eslint-disable-line

class Tooltip extends PureComponent {
  tooltipPortal() {
    return ReactDOM.createPortal(
      this.renderTooltipContent(),
      document.getElementById('root'),
    );
  }

  renderTooltipContent() {
    const { text, title, className } = this.props;
    return (
      <ReactTooltip
        id={title}
        place="top"
        class={cx('tooltip', className)}
        multiline
        type="light"
        offset={{
          right: 10,
        }}
      >
        <h2>{title}</h2>
        <p className="tooltip-text">{text}</p>
      </ReactTooltip>
    );
  }

  render() {
    const {
      title, icon, onClick, className,
    } = this.props;

    return (
      <React.Fragment>
        <Box
          data-tip
          data-for={title}
          onClick={() => onClick()}
          className={cx('tip-icon', className)}
        >
          {icon}
          {this.tooltipPortal()}
        </Box>
      </React.Fragment>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '',
  className: '',
  icon: <Help color="brand" />,
  onClick: null,
  title: 'Help',
};
