import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Help } from 'grommet-icons';
import { Box, Drop } from 'grommet';
import cx from 'classnames';

import './Tooltip.scss'; // eslint-disable-line

const KeyboardShortcuts = () => (
  <Box className="keyboard-shortcuts">
    Keyboard Shortcuts
    <Box direction="row" justify="start">
      <kbd>A</kbd>
      <Box className="keyboard-desc">Add a new note</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
+
      <kbd>P</kbd>
      <Box className="keyboard-desc">Search cards per label or title</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
+
      <kbd>V</kbd>
      <Box className="keyboard-desc">Add a note from clipboard</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>&rarr;</kbd>
      <Box className="keyboard-desc">Next board page</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>&larr;</kbd>
      <Box className="keyboard-desc">Previous board page</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
+
      <kbd>ENTER</kbd>
/
      <kbd>CTRL</kbd>
      <kbd>S</kbd>
+
      <Box className="keyboard-desc">Save card while editing</Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>ESC</kbd>
      <Box className="keyboard-desc">Unfocus card</Box>
    </Box>
  </Box>
);

class Tooltip extends PureComponent {
  state = {
    hover: false,
  };

  TooltipRef = React.createRef();

  render() {
    const {
      title,
      icon,
      onClick,
      className,
      text,
      children,
      data,
    } = this.props;
    const { hover } = this.state;

    const setHover = (hovered) => {
      this.setState({ hover: hovered });
    };

    return (
      <React.Fragment>
        <Box
          onClick={() => onClick && onClick()}
          className={cx('tip-icon', className)}
          ref={this.TooltipRef}
          target={icon}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {icon}
          {children}
        </Box>
        {this.TooltipRef.current && hover && (
          <Drop
            align={{ top: 'bottom' }}
            target={this.TooltipRef.current}
            plain
            responsive={false}
            elevation="none"
          >
            <Box
              margin="xsmall"
              pad="small"
              color="accent"
              background="neutral-2"
              round={{ size: 'medium', corner: 'left' }}
            >
              {data === 'keyboard-shortcuts' && <KeyboardShortcuts />}
              {text
                ? (typeof text === 'string' && text) || (
                <ul>
                  {text && text.map(block => <li key={block}>{block}</li>)}
                </ul>
                )
                : title}
            </Box>
          </Drop>
        )}
      </React.Fragment>
    );
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.string,
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '',
  data: '',
  className: '',
  children: <React.Fragment />,
  icon: <Help color="brand" />,
  onClick: null,
  title: '',
};
