import React, { Component as PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'grommet';

import './Button.scss'; // eslint-disable-line
class MdynaButton extends PureComponent {
  render() {
    const {
      children, className, color, ariaLabel, ...otherProps
    } = this.props;
    return (
      <Button
        a11yTitle={ariaLabel || 'Button'}
        aria-label={ariaLabel}
        color={color}
        className={cx('button', className)}
        {...otherProps}
      >
        {children}
      </Button>
    );
  }
}

MdynaButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  color: PropTypes.string,
  ariaLabel: PropTypes.string,
};

MdynaButton.defaultProps = {
  children: [],
  className: '',
  ariaLabel: 'Button',
  color: 'brand',
};

export default MdynaButton;
