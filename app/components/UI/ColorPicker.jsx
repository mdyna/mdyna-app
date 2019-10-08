import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapsible, Box } from 'grommet';
import camelCase from 'lodash/camelCase';
import cx from 'classnames';
import Button from 'UI/Button';
import './ColorPicker.scss';

const Input = (props) => {
  const {
    colors, value, onChange, label,
  } = props;
  const [colorsExpanded, expandColors] = useState(false);

  return (
    <Box
      justify="center"
      border={{ color: 'brand' }}
      className={cx('color-options', colorsExpanded && 'options-expanded')}
    >
      <Button color="text" onClick={() => expandColors(!colorsExpanded)}>
        Select Color
      </Button>
      <Collapsible open={colorsExpanded} direction="vertical">
        {colors.map(color => (
          <svg
            className={
              colorsExpanded ? 'options-expanded' : 'options-collapsed'
            }
            onClick={() => {
              expandColors(!colorsExpanded);
              onChange(camelCase(label), color);
            }}
            value={value}
            key={color}
          >
            <circle r="15" fill={color} />
          </svg>
        ))}
      </Collapsible>
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
