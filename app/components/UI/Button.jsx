import React, { Component as PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Button} from 'grommet';

import './Button.scss'; // eslint-disable-line
class MdynaButton extends PureComponent {
  render() {
    const {
      theme, children, className, color, icon, ariaLabel, ...otherProps
    } = this.props;
    return (
      <Button aria-label={ariaLabel} className={cx('button', color, className, icon && 'icon', `${theme}-theme`)} {...otherProps}>
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
  ariaLabel: PropTypes.string,
  theme: PropTypes.string,
};

MdynaButton.defaultProps = {
  children: [],
  theme: '',
  className: '',
  ariaLabel: 'Button',
  icon: false,
  color: '',
};

export default MdynaButton;
