import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import { FolderCycle } from 'grommet-icons';
import Button from 'UI/Button';
import PropTypes from 'prop-types';

import './FolderPicker.scss';

export default class FolderPicker extends PureComponent {
  render() {
    const {
      onChange, label, value, placeholder, className,
    } = this.props;
    return (
      <Fragment>
        <label className={cx('picker', className)} htmlFor="folder-picker">
          <Button>
            <FolderCycle color="brand" />
            {label}
          </Button>
          <input
            id="folder-picker"
            type="file"
            webkitdirectory=""
            style={{ visibility: 'none' }}
            onChange={e => onChange(e.target.files[0].path)}
            placeholder={value}
          />
        </label>
        {placeholder}
      </Fragment>
    );
  }
}

FolderPicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};

FolderPicker.defaultProps = {
  className: '',
  value: '',
  label: '',
  placeholder: '',
};
