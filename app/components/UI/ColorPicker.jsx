import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { Paint } from 'grommet-icons';
import { COLOR_LABELS } from 'Utils/colors';
import { TwitterPicker } from 'react-color';
import Button from 'UI/Button';
import OutsideClickHandler from 'react-outside-click-handler';
import './ColorPicker.scss';

const Input = (props) => {
  const { value, onChange } = props;
  const colors = Object.keys(COLOR_LABELS);
  const [colorsExpanded, expandColors] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => expandColors(false)}>
      <Button
        className="color-picker-button"
        onClick={() => expandColors(!colorsExpanded)}
        primary
        color="accent-1"
      >
        <Paint color="brand" />
      </Button>
      {colorsExpanded && (
        <Box background="dark-2">
          <TwitterPicker
            triangle="hide"
            color={value}
            onChange={c => onChange(c.hex)}
            colors={colors}
          />
        </Box>
      )}
    </OutsideClickHandler>
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
