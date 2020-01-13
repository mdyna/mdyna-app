import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
// eslint-disable-next-line
import { startCase, snakeCase } from 'lodash';

const Input = (props) => {
  const {
    label, value, onChange, type, ...otherProps
  } = props;
  return (
    <TextInput
      focus={false}
      key={label}
      id={snakeCase(label)}
      defaultValue={value || ''}
      type={type}
      placeholder={startCase(label)}
      onChange={e => onChange(e)}
      {...otherProps}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  type: '',
  value: '',
  onChange: null,
};

export default Input;
