import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import FolderCycleIcon from 'grommet/components/icons/base/FolderCycle';
import PropTypes from 'prop-types';

import './FolderPicker.scss';

export default class FolderPicker extends PureComponent {
  render() {
    const { onChange, value, whiteMode } = this.props;
    return (
      <Fragment>
        <label className={cx('picker', whiteMode && 'white-mode')} htmlFor="folder-picker">
          Change directory
          <FolderCycleIcon />
          <input
            id="folder-picker"
            type="file"
            webkitdirectory=""
            style={{ visibility: 'none' }}
            onChange={e => onChange(e.target.value)}
            placeholder={value}
          />
        </label>
      </Fragment>
    );
  }
}

FolderPicker.propTypes = {
  whiteMode: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FolderPicker.defaultProps = {
  value: '',
  whiteMode: false,
};
