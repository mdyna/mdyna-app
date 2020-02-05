import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextInput } from 'grommet';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Label } from 'UI/Labels';
import { Close } from 'grommet-icons';
// eslint-disable-next-line
import { camelCase } from 'lodash';

import './LabelPicker.scss';

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
    console.log(value);
    for (let i = 0; i < value.length; i += 1) {
      const v = value[i];
      if (titles.indexOf(v.title) === -1) {
        titles.push(v.title);
        Labels.push(
          <Label
            key={`${v}${i + 0}`}
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
          />,
        );
      }
    }
    return Labels;
  };
  console.log('CURRENT TAG VALUE', currentTag);
  return (
    <KeyboardEventHandler
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
        pad={{ horizontal: 'xsmall' }}
        margin="xsmall"
        className="label-picker-input"
        background="accent-1"
        border="all"
        ref={boxRef}
        wrap
      >
        {value.length > 0 && renderValue()}
        <Box flex style={{ minWidth: '120px', color }}>
          <TextInput
            type="search"
            plain
            dropTarget={box}
            suggestions={suggestions}
            onChange={updateCurrentTag}
            value={currentTag}
            autoFocus
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
