import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FolderPicker extends PureComponent {
  render() {
    const { onChange, value } = this.props;
    return (
      <input
        type="file"
        webkitdirectory=""
        onChange={e => onChange(e.target.value)}
        placeholder={value}
      />
    );
  }
}

FolderPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FolderPicker.defaultProps = {
  value: '',
};
