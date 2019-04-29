import React, { Component as PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'grommet/components/Button';

import './Button.scss'; // eslint-disable-line
class MdynaButton extends PureComponent {
  render() {
    const {
      children, className, color, icon, ...otherProps
    } = this.props;
    return (
      <Button className={cx('button', color, className, icon && 'icon')} {...otherProps}>
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
};

MdynaButton.defaultProps = {
  children: [],
  className: '',
  icon: false,
  color: '',
};

export default MdynaButton;
