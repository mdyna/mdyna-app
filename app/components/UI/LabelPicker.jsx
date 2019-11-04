import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Keyboard, TextInput } from 'grommet';
import Button from 'UI/Button';
import { Label } from 'UI/Labels';
import { Tag, Close } from 'grommet-icons';
import { camelCase } from 'lodash';

import './LabelPicker.scss';

const TagInput = ({
  onAdd, color, onChange, onRemove, value, suggestions,
}) => {
  const [currentTag, setCurrentTag] = React.useState('');
  const [box, setBox] = React.useState();
  const boxRef = React.useCallback(setBox, []);

  const updateCurrentTag = (event) => {
    setCurrentTag(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onAddTag = (tag) => {
    if (onAdd) {
      onAdd(tag);
    }
  };

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag);
      setCurrentTag('');
    }
  };

  const renderValue = () => value.map
    && value.map((v, index) => (
      <Label
        key={`${v}${index + 0}`}
        color={color}
        onClick={() => {
          onRemove(v);
        }}
        label={(
          <React.Fragment>
            {(v && v.title) || v}
            <Close color="accent-2" size="12px" />
          </React.Fragment>
)}
      />
    ));

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction="row"
        align="center"
        pad={{ horizontal: 'xsmall' }}
        margin="xsmall"
        className="label-picker-input"
        background="dark-1"
        border="all"
        ref={boxRef}
        wrap
      >
        {value.length > 0 && renderValue()}
        <Box flex style={{ minWidth: '120px' }}>
          <TextInput
            type="search"
            plain
            dropTarget={box}
            suggestions={suggestions}
            onChange={updateCurrentTag}
            value={currentTag}
            onSelect={(event) => {
              event.stopPropagation();
              onAddTag(event.suggestion);
            }}
          />
        </Box>
      </Box>
    </Keyboard>
  );
};

TagInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};
TagInput.defaultProps = {
  value: [],
  suggestions: [],
  color: '',
};

const LabelPicker = (props) => {
  const {
    globalLabels, cardLabels, onRemove, onAdd, onChange, color,
  } = props;

  const [selectedTags, setSelectedTags] = React.useState(cardLabels);
  const [suggestions, setSuggestions] = React.useState(globalLabels);
  const [inputHidden, toggleInput] = useState(true);

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
    onChange([...cardLabels.filter(l => l.title !== labelTitle)]);
    onRemove({ title: labelTitle });
    setSelectedTags(newTags);
  };

  const onAddTag = (tag) => {
    const labelTitle = transformTag(tag);
    if (selectedTags.indexOf(labelTitle) === -1) {
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
    <React.Fragment>
      <Button
        className="label-picker-button"
        onClick={() => toggleInput(!inputHidden)}
        primary
        color="accent-1"
      >
        <Tag color="brand" />
      </Button>
      {!inputHidden && (
        <TagInput
          placeholder="Search for aliases..."
          suggestions={suggestions}
          plain
          value={selectedTags}
          color={color}
          onRemove={onRemoveTag}
          onAdd={onAddTag}
          onChange={v => onFilterSuggestion(v.target.value)}
        />
      )}
    </React.Fragment>
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
