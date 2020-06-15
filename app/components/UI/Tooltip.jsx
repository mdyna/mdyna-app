import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Help } from 'grommet-icons';
import { Box, Drop, Text } from 'grommet';
import cx from 'classnames';

import "./Tooltip.scss"; // eslint-disable-line

const KeyboardShortcuts = () => (
  <Box className="keyboard-shortcuts" color="accent-1">
    <Text color="brand">Keyboard Shortcuts</Text>
    <Box direction="row" justify="start">
      <kbd>A</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Add a new note</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
      <Text color="brand">
+
      </Text>
      <kbd>P</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Search cards per label or title</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
      <Text color="brand">
+
      </Text>
      <kbd>V</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Add a note from clipboard</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>&rarr;</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Next board page</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>&larr;</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Previous board page</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>CTRL</kbd>
      <Text color="brand">
+
      </Text>
      <kbd>ENTER</kbd>
      <Text color="brand">
/
      </Text>
      <kbd>CTRL</kbd>
      <kbd>S</kbd>
      <Text color="brand">
+
      </Text>
      <Box className="keyboard-desc">
        <Text color="brand">Save card while editing</Text>
      </Box>
    </Box>
    <Box direction="row" justify="start">
      <kbd>ESC</kbd>
      <Box className="keyboard-desc">
        <Text color="brand">Unfocus card</Text>
      </Box>
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
      hoverIndicator,
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
          hoverIndicator={hoverIndicator || null}
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
            <Box margin="xsmall" pad="small" background="neutral-1">
              {data === 'keyboard-shortcuts' && <KeyboardShortcuts />}
              {text
                ? (typeof text === 'string' && (
                <Text color="brand">{text}</Text>
                )) || (
                <ul>
                  {text
                        && text.map(block => <li key={block}>{block}</li>)}
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
  hoverIndicator: PropTypes.string,
  data: PropTypes.string,
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '',
  data: '',
  hoverIndicator: '',
  className: '',
  children: <React.Fragment />,
  icon: <Help color="brand" />,
  onClick: null,
  title: '',
};
