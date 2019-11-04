import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Keyboard, TextInput } from 'grommet';
import Button from 'UI/Button';
import { Label } from 'UI/Labels';
import { Tag } from 'grommet-icons';
import { camelCase, snakeCase, startCase } from 'lodash';

const TagInput = ({
  globalLabels = [],
  onAdd,
  onChange,
  onRemove,
  value,
  suggestions,
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

  const renderValue = () => value.map((v, index) => (
    <Label
      key={`${v}${index + 0}`}
      onClick={() => {
        onRemove(v);
      }}
      label={(v && v.title) || v}
    />
  ));

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction="row"
        align="center"
        pad={{ horizontal: 'xsmall' }}
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

const LabelPicker = (props) => {
  const {
    globalLabels, cardLabels, onRemove, onAdd, onChange,
  } = props;

  const [selectedTags, setSelectedTags] = React.useState(cardLabels);
  const [suggestions, setSuggestions] = React.useState(globalLabels);
  const [inputHidden, toggleInput] = useState(true);

  const onRemoveTag = (tag) => {
    const removeIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];
    if (removeIndex >= 0) {
      newTags.splice(removeIndex, 1);
    }
    onChange([...cardLabels.filter(l => l.title !== tag.title)]);
    onRemove({ title: tag });
    setSelectedTags(newTags);
  };

  const onAddTag = (tag) => {
    onAdd({ title: tag });
    onChange([...(cardLabels || []), { title: tag }]);
    setSelectedTags([...selectedTags, tag]);
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
        className="color-picker-button"
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
          value={selectedTags}
          onRemove={onRemoveTag}
          onAdd={onAddTag}
          onChange={v => onFilterSuggestion(v.target.value)}
        />
      )}
    </React.Fragment>
  );
};

LabelPicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  globalLabels: PropTypes.array,
  cardLabels: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

LabelPicker.defaultProps = {
  cardLabels: [],
  value: '',
  globalLabels: [''],
};

export default LabelPicker;
