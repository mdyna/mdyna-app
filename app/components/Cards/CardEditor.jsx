import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import ColorPicker from 'UI/ColorPicker';
import Button from 'UI/Button';

class CardEditor extends PureComponent {
  name = 'Card Editor';

  render() {
    const {
      card,
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
        <ColorPicker
          value={color}
          onChange={c => onChange('editingColor', c, card.id, isFocused, card)}
        />
        <Box
          direction="row"
          justify="evenly"
          style={{
            border: `1px solid ${tinycolor(color).darken(10)}`,
            borderRadius: '10px',
          }}
        >
          {/*         <LabelPicker /> */}
          <Button
            hoverIndicator={false}
            color="accent-3"
            onClick={() => onSubmit({
              ...card,
            })
            }
          >
            Submit
            <Checkmark color="accent-3" size="18px" />
          </Button>
          <Button
            hoverIndicator={false}
            color="accent-2"
            onClick={() => onDiscard(card, isFocused)}
          >
            Discard
            <Close color="accent-2" size="18px" />
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
  onSubmit: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

CardEditor.defaultProps = {
  isFocused: false,
};
