import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import LabelInput from 'UI/LabelInput';
// eslint-disable-next-line
import { camelCase } from 'lodash';

import './LabelPicker.scss';


const LabelPicker = (props) => {
  const {
    globalLabels, cardLabels, onRemove, onAdd, onChange, color,
  } = props;

  const [selectedTags, setSelectedTags] = React.useState(cardLabels);
  const [suggestions, setSuggestions] = React.useState(globalLabels);

  useEffect(() => {
    setSelectedTags(cardLabels);
  }, [cardLabels]);

  const transformTag = (tag) => {
    const newTag = camelCase(tag);
    return newTag.startsWith('#') ? newTag : `#${newTag}`;
  };

  const onRemoveTag = (tag) => {
    const labelTitle = transformTag(tag.title || tag);
    const removeIndex = selectedTags.map(t => t.title).indexOf(labelTitle);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    onChange(cardLabels.filter(l => l.title !== labelTitle));
    onRemove({ title: labelTitle });
    setSelectedTags(newTags);
  };

  const onAddTag = (tag) => {
    const labelTitle = transformTag(tag);
    const labelTitles = selectedTags.map(t => t.title);

    if (labelTitles.indexOf(labelTitle) === -1) {
      onAdd({ title: labelTitle });
      onChange([...(cardLabels || []), { title: labelTitle }]);
      setSelectedTags([...selectedTags, labelTitle]);
    }
  };

  const onFilterSuggestion = (v) => {
    setSuggestions(
      globalLabels.filter(
        suggestion => suggestion
          && suggestion.toLowerCase().indexOf(v && v.toLowerCase()) >= 0,
      ),
    );
  };

  return (
    <LabelInput
      placeholder="Search for aliases..."
      suggestions={suggestions.splice(0, 10)}
      plain
      value={selectedTags}
      color={color}
      onRemove={onRemoveTag}
      onAdd={onAddTag}
      onChange={v => onFilterSuggestion(v.target.value)}
    />
  );
};

LabelPicker.propTypes = {
  globalLabels: PropTypes.array,
  cardLabels: PropTypes.array,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

LabelPicker.defaultProps = {
  cardLabels: [],
  color: null,
  globalLabels: [''],
};

export default LabelPicker;
