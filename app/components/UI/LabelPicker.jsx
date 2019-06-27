import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
import _ from 'lodash';

const LabelPicker = (props) => {
  const {
    label, labels, value, onChange,
  } = props;
  const [labelInput, changeValue] = useState(value || '');

  const getSuggestions = () => {
    if (labelInput) {
      const inputLabels = labelInput.split(' ');
      const lastLabel = inputLabels[inputLabels.length - 1];
      const lastLabelLength = lastLabel.length;
      const userLabels = labels && labels.map(d => d.title);
      return userLabels
        .filter(d => d.slice(0, lastLabelLength) === lastLabel && inputLabels.indexOf(d) === -1)
        .slice(0, 5);
    }
    return [' '];
  };

  return (
    <TextInput
      key={label}
      id={_.snakeCase(label)}
      suggestions={labels && getSuggestions(labels.map(d => d.title))}
      defaultValue={
      value
        ? `${value
          .map(d => d.title)
          .join(' ')
          .trim()} #`
        : '#'
    }
      onSelect={(e) => {
        const selectedValue = `${labelInput.substring(0, labelInput.lastIndexOf(' '))} ${
          e.suggestion
        } #`;
        if (selectedValue) {
          onChange(value, selectedValue);
          changeValue(selectedValue);
        }
      }}
      placeHolder={_.startCase(label)}
      onChange={(e) => {
        if (e.target.value) {
          onChange(value, e.target.value);
          changeValue(e.target.value);
        }
      }}
    />
  );
};


LabelPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  labels: PropTypes.array,
  onChange: PropTypes.func,
};

LabelPicker.defaultProps = {
  label: '',
  value: '',
  labels: [''],
  onChange: null,
};

export default LabelPicker;
