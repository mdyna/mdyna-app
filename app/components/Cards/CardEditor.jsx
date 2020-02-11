import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { Box, Text } from 'grommet';
import {
  Checkmark, Close, Tag, Paint,
} from 'grommet-icons';
import PropTypes from 'prop-types';


import BoardsIcon from 'UI/BoardsIcon';
import ColorPicker from 'UI/ColorPicker';
import BoardPicker from 'UI/BoardPicker';
import LabelPicker from 'UI/LabelPicker';
import Button from 'UI/Button';

class CardEditor extends PureComponent {
  name = 'Card Editor';

  cardPickers() {
    const {
      labelPickerProps,
      boardPickerProps,
      onChange,
      color,
      card,
      isFocused,
    } = this.props;
    return [
      {
        label: 'Color',
        formControl: propName => (
          <ColorPicker
            value={color}
            onChange={c => onChange(propName, c, card.id, isFocused, card)
          }
          />
        ),
        propName: 'editingColor',
        icon: <Paint color="brand" />,
        props: {},
      },
      {
        label: 'Label',
        formControl: propName => (
          <LabelPicker
            {...labelPickerProps}
            onChange={c => onChange(propName, c, card.id, isFocused, card)
          }
          />
        ),
        propName: 'editingLabels',
        icon: <Tag color="brand" />,
      },
      {
        label: 'Board',
        formControl: propName => (
          <BoardPicker
            addButton
            value={card.board}
            onClick={c => onChange(propName, c, card.id, isFocused, card)}
            {...boardPickerProps}
          />
        ),
        propName: 'board',
        half: true,
        props: boardPickerProps,
        icon: <BoardsIcon />,
      },
      {
        label: 'Board',
        formControl: propName => (
          <BoardPicker
            addButton
            value={card.board}
            onClick={c => onChange(propName, c, card.id, isFocused, card)}
            {...boardPickerProps}
          />
        ),
        propName: 'board',
        half: true,
        props: boardPickerProps,
        icon: <BoardsIcon />,
      },
      /*
      {
        label: 'Color',
        formControl: (props) => <ColorPicker {...props}/>,
        propName: 'editingColor',
        value: color,
        props: {},
      },
      */
    ];
  }

  renderCardPickers() {
    const { color } = this.props;
    const cardControls = this.cardPickers();
    return (
      <Box direction="column" wrap style={{ maxWidth: 700 }}>
        {cardControls.map(c => (
          <Box
            key={`${c.label}-picker`}
            direction="row"
            align="center"
            justify="between"
            background="accent-1"
            style={{
              padding: 10,
              border: `1px solid ${tinycolor(color).darken(10)}`,
              borderRadius: '10px',
              width: c.half ? '50%' : '100%',
            }}
          >
            {c.icon}
            <Text weight="bold" margin="0px 10px" color="brand">{c.label}</Text>
            {c.formControl(c.propName)}
          </Box>
        ))}
      </Box>
    );
  }

  render() {
    const {
      card,
      onSubmit,
      onDiscard,
      color,
      isFocused,
    } = this.props;
    return (
      <Box
        direction="column"
        justify="evenly"
        style={{
          borderRadius: 10,
          position: 'sticky',
          zIndex: 10,
          top: '10px',
          transition: 'all 0.5s ease-in',
          background: `${color}aa`,
        }}
      >
        {this.renderCardPickers()}
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
