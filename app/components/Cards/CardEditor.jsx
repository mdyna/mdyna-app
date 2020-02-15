import React, { PureComponent } from 'react';
import tinycolor from 'tinycolor2';
import { Box, Text } from 'grommet';
import {
  Checkmark, Close, Tag, Paint, Test,
} from 'grommet-icons';
import PropTypes from 'prop-types';

import BoardsIcon from 'UI/BoardsIcon';
import ColorPicker from 'UI/ColorPicker';
import BoardPicker from 'UI/BoardPicker';
import LabelPicker from 'UI/LabelPicker';
import TemplatePicker from 'UI/TemplatePicker';
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
            onChange={c => onChange(propName, c, card.id, isFocused, card)}
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
            onChange={c => onChange(propName, c, card.id, isFocused, card)}
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
        label: 'Template',
        formControl: () => (
          <TemplatePicker
            onClick={c => onChange('template', c, card.id, isFocused, card)}
          />
        ),
        half: true,
        icon: <Test color="brand" />,
      },
    ];
  }

  renderCardPickers(cardControls) {
    const { color } = this.props;
    return cardControls.map(c => (
      <Box
        key={`${c.label}-picker`}
        direction="row"
        align="center"
        justify="start"
        background="accent-1"
        style={{
          width: c.half ? 'auto' : 585,
          height: c.half ? 55 : 'auto',
          padding: 10,
          border: `1px solid ${tinycolor(color).darken(10)}`,
          margin: '5px 5px 0 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          borderRadius: '10px',
        }}
      >
        {c.icon}
        <Text weight="bold" margin="0px 10px" color="brand">
          {c.label}
        </Text>
        <Box width="100%">{c.formControl(c.propName)}</Box>
      </Box>
    ));
  }

  render() {
    const {
      card, onSubmit, onDiscard, color, isFocused,
    } = this.props;

    const cardControls = this.cardPickers();
    const fullWidthControls = [];
    const halfWidthControls = [];
    cardControls.forEach(control => (control.half
      ? halfWidthControls.push(control)
      : fullWidthControls.push(control)));
    return (
      <Box
        direction="column"
        justify="evenly"
        style={{
          borderRadius: 10,
          zIndex: 10,
          transition: 'all 0.5s ease-in',
          background: `${color}aa`,
        }}
      >
        <Box direction="row" wrap style={{ maxWidth: 900 }}>
          <Box direction="column">
            {this.renderCardPickers(fullWidthControls)}
          </Box>
          <Box direction="row" wrap justify="between" alignSelf="end">
            {this.renderCardPickers(halfWidthControls)}
          </Box>
        </Box>
        <Box
          direction="row"
          justify="start"
        >
          <Box background="accent-1" style={{ borderRadius: 10, padding: 5, margin: '10px 10px 0 0' }}>
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
          </Box>
          <Box background="accent-1" style={{ borderRadius: 10, padding: 5, margin: '10px 10px 0 0' }}>
            <Button
              hoverIndicator={false}
              background="accent-1"
              color="accent-2"
              onClick={() => onDiscard(card, isFocused)}
            >
              Discard
              <Close color="accent-2" size="18px" style={{ margin: '0 5px' }} />
            </Button>
          </Box>
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
