import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { COLOR_LABELS } from 'Utils/colors';
import { TwitterPicker } from 'react-color';
import './ColorPicker.scss';

const Input = (props) => {
  const { value, onChange } = props;
  const colors = Object.keys(COLOR_LABELS);
  return (
    <Box direction="row" justify="start">
      <Box background="transparent">
        <TwitterPicker
          triangle="hide"
          color={value}
          onChange={c => onChange(c.hex)}
          colors={colors}
        />
      </Box>
    </Box>
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
