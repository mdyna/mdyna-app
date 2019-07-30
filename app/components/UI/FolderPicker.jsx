import React, { PureComponent } from 'react';
import { Box } from 'grommet';
import cx from 'classnames';
import { FolderCycle } from 'grommet-icons';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import PropTypes from 'prop-types';

import './FolderPicker.scss';

export default class FolderPicker extends PureComponent {
  render() {
    const {
      onChange, label, value, placeholder, className,
    } = this.props;
    return (
      <Button>
        <label className={cx('picker', className)} htmlFor="folder-picker">
          <Box direction="row" align="center" justify="end">
            <Tooltip
              icon={<FolderCycle color="brand" />}
              title="Change Cards Directory"
              text="Change the directory in which your cards live. If you connect it to Dropbox or Google Drive, you can have your cards in multiple devices"
            />
            <span>{label}</span>
          </Box>
          <input
            id="folder-picker"
            type="file"
            webkitdirectory=""
            style={{ visibility: 'none' }}
            onChange={e => onChange(e.target.files[0].path)}
            placeholder={value}
          />
          <span className="placeholder">{placeholder}</span>
        </label>
      </Button>
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
