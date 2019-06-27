import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Box } from 'grommet';
import _ from 'lodash';

const Input = (props) => {
  const {
    colors, value, onChange, label,
  } = props;

  return (
    <Box className="color-options">
      {colors.map(color => (
        <svg
          onClick={() => onChange(_.camelCase(label), color)}
          value={value}
          key={color}
        >
          <circle r="15" fill={color} />
        </svg>
      ))}
    </Box>
  );
};


Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  colors: PropTypes.array,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  colors: PropTypes.array,
  onChange: null,
};

export default Input;
