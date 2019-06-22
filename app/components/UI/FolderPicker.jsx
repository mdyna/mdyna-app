import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import {FolderCycle} from 'grommet-icons';
import PropTypes from 'prop-types';

import './FolderPicker.scss';

export default class FolderPicker extends PureComponent {
  render() {
    const {
      onChange, label, value, whiteMode, placeholder,
    } = this.props;
    return (
      <Fragment>
        <label className={cx('picker', whiteMode && 'white-mode')} htmlFor="folder-picker">
          <FolderCycle />
          {label}
          <input
            id="folder-picker"
            type="file"
            webkitdirectory=""
            style={{ visibility: 'none' }}
            onChange={e => {onChange(e.target.files[0].path)}}
            placeholder={value}
          />
        </label>
        {placeholder}
      </Fragment>
    );
  }
}

FolderPicker.propTypes = {
  whiteMode: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FolderPicker.defaultProps = {
  value: '',
  whiteMode: false,
  label: '',
  placeholder: '',
};
