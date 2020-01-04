import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import ColorPicker from 'UI/ColorPicker';
import BoardPicker from 'UI/BoardPicker';
import LabelPicker from 'UI/LabelPicker';
import Button from 'UI/Button';

class CardEditor extends PureComponent {
  name = 'Card Editor';

  render() {
    const {
      card,
      labelPickerProps,
      boardPickerProps,
      onSubmit,
      onDiscard,
      onChange,
      color,
      isFocused,
    } = this.props;
    return (
      <Box
        direction="column"
        justify="evenly"
        style={{
          position: 'sticky',
          zIndex: 10,
          top: '10px',
          transition: 'all 0.5s ease-in',
          background: `${color}aa`,
        }}
      >
        <Box
          direction="row"
          justify="evenly"
          background="accent-1"
          style={{
            border: `1px solid ${tinycolor(color).darken(10)}`,
            borderRadius: '10px',
          }}
          wrap
        >
          <ColorPicker
            value={color}
            onChange={c => onChange('editingColor', c, card.id, isFocused, card)
            }
          />
          <LabelPicker
            {...labelPickerProps}
            onChange={c => onChange('editingLabels', c, card.id, isFocused, card)
            }
          />
          <BoardPicker
            addButton
            value={card.board}
            onClick={c => onChange('board', c, card.id, isFocused, card)}
            {...boardPickerProps}
          />
        </Box>
        <Box
          direction="row"
          justify="evenly"
          background="accent-1"
          style={{
            border: `1px solid ${tinycolor(color).darken(10)}`,
            borderRadius: '10px',
          }}
        >
          <Button
            hoverIndicator={false}
            color="accent-3"
            onClick={() => onSubmit({
              ...card,
            })
            }
          >
            Submit
            <Checkmark
              color="accent-3"
              size="18px"
              style={{ margin: '0 5px' }}
            />
          </Button>
          <Button
            hoverIndicator={false}
            color="accent-2"
            onClick={() => onDiscard(card, isFocused)}
          >
            Discard
            <Close color="accent-2" size="18px" style={{ margin: '0 5px' }} />
          </Button>
        </Box>
      </Box>
    );
  }
}

export default CardEditor;

CardEditor.propTypes = {
  card: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  labelPickerProps: PropTypes.object.isRequired,
  boardPickerProps: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

CardEditor.defaultProps = {
  isFocused: false,
};
