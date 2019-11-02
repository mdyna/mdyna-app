import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paint } from 'grommet-icons';
import { COLOR_LABELS } from 'Utils/colors';
import { TwitterPicker } from 'react-color';
import Button from 'UI/Button';
import './ColorPicker.scss';

const Input = (props) => {
  const { value, onChange } = props;
  const colors = Object.keys(COLOR_LABELS);
  const [colorsExpanded, expandColors] = useState(false);
  return (
    <React.Fragment>
      <Button
        className="color-picker-button"
        onClick={() => expandColors(!colorsExpanded)}
        primary
        color="accent-1"
      >
        <Paint color="brand" />
      </Button>
      {colorsExpanded && (
        <TwitterPicker
          color={value}
          onChange={c => onChange(c.hex)}
          colors={colors}
        />
      )}
    </React.Fragment>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  onChange: null,
};

export default Input;
