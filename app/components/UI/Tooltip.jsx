import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HelpIcon from 'grommet/components/icons/base/Help';
import Box from 'grommet/components/Box';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import MarkdownText from 'UI/MarkdownText';


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

  tooltipPortal() {
    return ReactDOM.createPortal(
      this.renderTooltipContent(),
      document.getElementById('root'),
    );
  }

  renderTooltipContent() {
    const { text, title, whiteMode } = this.props;
    console.log(text);
    return (
      <ReactTooltip
        id={title}
        place="top"
        class={cx('tooltip', whiteMode && 'white-mode')}
        multiline
        offset={{
          left: 20,
        }}
      >
        <h3>
          {title}
        </h3>
        <MarkdownText
          whiteMode={whiteMode}
          className="tooltip-text"
          text={text}
        />
      </ReactTooltip>
    );
  }

  render() {
    const {
      title, whiteMode, icon, onClick,
    } = this.props;

    return (
      <React.Fragment>
        <Box
          data-tip
          data-for={title}
          onClick={() => onClick()}
          onMouseEnter={() => this.showTooltip()}
          onMouseLeave={() => this.hideTooltip()}
          className={cx('tip-icon', whiteMode && 'white-mode')}
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
  title: PropTypes.string,
  whiteMode: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  text: '',
  icon: <HelpIcon />,
  onClick: null,
  title: 'help',
};
