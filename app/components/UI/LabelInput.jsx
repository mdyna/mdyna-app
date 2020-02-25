import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Label } from 'UI/Labels';
import { Close } from 'grommet-icons';

const LabelInput = ({
  onAdd,
  color,
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
    setCurrentTag('');
    if (onAdd) {
      onAdd(tag);
    }
  };

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag);
    }
  };

  const renderValue = () => {
    const titles = [];
    const Labels = [];
    for (let i = 0; i < value.length; i += 1) {
      const v = value[i];
      const title = (v && v.title) || v;
      if (titles.indexOf(title) === -1) {
        titles.push(title);
        Labels.push(
          <Label
            key={`${v}${i + 0}`}
            color={color}
            onClick={() => {
              onRemove(v);
            }}
            label={(
              <React.Fragment>
                <Close color="accent-2" size="12px" />
                {title}
              </React.Fragment>
)}
          />,
        );
      }
    }
    return Labels;
  };
  return (
    <KeyboardEventHandler
      style={{ width: '100%' }}
      handleKeys={['enter']}
      onKeyEvent={(key) => {
        if (key === 'enter') {
          onEnter();
        }
      }}
    >
      <Box
        direction="row"
        align="center"
        background="accent-1"
        style={{ borderRadius: 10, paddingTop: 5 }}
        border="all"
        ref={boxRef}
        wrap
      >
        {value.length > 0 && renderValue()}
        <Box style={{ color, width: '100%' }}>
          <TextInput
            type="search"
            plain
            dropTarget={box}
            suggestions={suggestions}
            onChange={updateCurrentTag}
            color="inherit"
            value={currentTag}
            onSelect={(event) => {
              event.stopPropagation();
              onAddTag(event.suggestion);
            }}
          />
        </Box>
      </Box>
    </KeyboardEventHandler>
  );
};

LabelInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};
LabelInput.defaultProps = {
  value: [],
  suggestions: [],
  color: '',
};

export default LabelInput;
