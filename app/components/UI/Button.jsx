import React, { Component as PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'grommet/components/Button';

class MdynaButton extends PureComponent {
  render() {
    const { children, className, ...otherProps } = this.props;
    return (
      <Button className={cx('button', className)} {...otherProps}>
        {children}
      </Button>
    );
  }
}

MdynaButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

MdynaButton.defaultProps = {
  children: [],
  className: '',
};

export default MdynaButton;
