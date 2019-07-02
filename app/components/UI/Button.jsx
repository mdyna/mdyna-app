import React, { Component as PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'grommet';

import './Button.scss'; // eslint-disable-line
class MdynaButton extends PureComponent {
  render() {
    const {
      theme, children, className, color, icon, hoverIndicator, ariaLabel, ...otherProps
    } = this.props;
    return (
      <Button
        hoverIndicator={hoverIndicator}
        aria-label={ariaLabel}
        color={color}
        className={cx('button', className, icon && 'icon')}
        {...otherProps}
      >
        {children}
      </Button>
    );
  }
}

MdynaButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  icon: PropTypes.bool,
  color: PropTypes.string,
  hoverIndicator: PropTypes.string,
  ariaLabel: PropTypes.string,
  theme: PropTypes.string,
};

MdynaButton.defaultProps = {
  children: [],
  theme: '',
  className: '',
  hoverIndicator: 'accent-1',
  ariaLabel: 'Button',
  icon: false,
  color: 'brand',
};

export default MdynaButton;
