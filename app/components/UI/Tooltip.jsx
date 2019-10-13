import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Help } from 'grommet-icons';
import { Box, Drop } from 'grommet';
import cx from 'classnames';

import './Tooltip.scss'; // eslint-disable-line

class Tooltip extends PureComponent {
  state = {
    hover: false,
  };

  TooltipRef = React.createRef();

  render() {
    const {
      title, icon, onClick, className, text, children,
    } = this.props;
    const { hover } = this.state;

    const setHover = (hovered) => {
      this.setState({ hover: hovered });
    };

    return (
      <React.Fragment>
        <Box
          onClick={() => onClick()}
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
            align={{ left: 'right' }}
            target={this.TooltipRef.current}
            plain
          >
            <Box
              margin="xsmall"
              pad="small"
              color="accent"
              background="neutral-2"
              round={{ size: 'medium', corner: 'left' }}
            >
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
  title: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '',
  className: '',
  children: <React.Fragment />,
  icon: <Help color="brand" />,
  onClick: null,
  title: 'Help',
};
