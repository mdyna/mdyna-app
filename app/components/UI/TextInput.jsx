import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
import _ from 'lodash';

const Input = (props) => {
  const {
    label, value, onChange,
  } = props;

  return (
    <TextInput
      focus={false}
      key={label}
      id={_.snakeCase(label)}
      defaultValue={value || ''}
      placeHolder={_.startCase(label)}
      onChange={e => onChange(_.camelCase(label), e.target.value)}
  />
  );
};


Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  onChange: null,
};

export default Input;
