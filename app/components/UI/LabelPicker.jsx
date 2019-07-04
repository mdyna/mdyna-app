import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'grommet';
import _ from 'lodash';

const LabelPicker = (props) => {
  const {
    label, labels, value, onChange, setting,
  } = props;
  const [labelInput, changeValue] = useState('');
  const [labelCount, setCount] = useState(0);

  const getSuggestions = () => {
    const inputLabels = labelInput.split(' ');
    const lastLabel = inputLabels[inputLabels.length - 1];
    const lastLabelLength = lastLabel.length;
    const userLabels = labels && labels.map(d => d.title);
    return userLabels
      .filter(d => d.slice(0, lastLabelLength) === lastLabel && inputLabels.indexOf(d) === -1)
      .slice(0, 5);
  };

  const changeStringSplit = (schema, val) => {
    const { prefixer, splitters } = schema;
    const settingName = schema.settingName || 'labels';
    const result = [];
    for (let splitterIndex = 0; splitterIndex < splitters.length; splitterIndex += 1) {
      const splitter = splitters[splitterIndex];
      const splitVals = val.split(splitter);
      if (splitVals.length !== labelCount) {
        setCount(labelCount);
      }
      for (let i = 0; i < splitVals.length; i += 1) {
        const splitVal = splitVals[i].trim();
        if (splitVal && splitter !== splitVal && splitVal !== prefixer) {
          result.push(`${prefixer}${_.camelCase(splitVal)}`);
        }
      }
    }
    const newLabels = result.map(d => ({
      title: d,
    }));
    onChange(_.camelCase(settingName), newLabels);
  };

  return (
    <TextInput
      key={label}
      id={_.snakeCase(label)}
      suggestions={labels && getSuggestions(labels.map(d => ({ label: d.title, value: d.title })))}
      focus={false}
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
          changeStringSplit(setting, selectedValue);
          changeValue(selectedValue);
          e.target.value = selectedValue;
        }
      }}
      placeHolder={_.startCase(label)}
      onChange={(e) => {
        if (e.target.value) {
          changeStringSplit(setting, e.target.value);
          changeValue(e.target.value);
        }
      }}
    />
  );
};

LabelPicker.propTypes = {
  label: PropTypes.string,
  setting: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  labels: PropTypes.array,
  onChange: PropTypes.func,
};

LabelPicker.defaultProps = {
  label: '',
  setting: {},
  value: '',
  labels: [''],
  onChange: null,
};

export default LabelPicker;
