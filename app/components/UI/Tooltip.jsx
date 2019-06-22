import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Help} from 'grommet-icons';
import {Box} from 'grommet';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import MarkdownText from 'UI/MarkdownText';

import './Tooltip.scss'; // eslint-disable-line

class Tooltip extends PureComponent {
  tooltipPortal() {
    return ReactDOM.createPortal(this.renderTooltipContent(), document.getElementById('root'));
  }

  renderTooltipContent() {
    const {
      text, title, whiteMode, className,
    } = this.props;

    return (
      <ReactTooltip
        id={title}
        place="top"
        class={cx('tooltip', whiteMode && 'white-mode', className)}
        multiline
        offset={{
          right: 10,
        }}
      >
        <h2>{title}</h2>
        <MarkdownText disableCode whiteMode={whiteMode} className="tooltip-text" text={text} />
      </ReactTooltip>
    );
  }

  render() {
    const {
      title, whiteMode, icon, onClick, className,
    } = this.props;

    return (
      <React.Fragment>
        <Box
          data-tip
          data-for={title}
          onClick={() => onClick()}
          className={cx('tip-icon', whiteMode && 'white-mode', className)}
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
  whiteMode: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  text: '',
  className: '',
  icon: <Help />,
  onClick: null,
  title: 'Help',
};
