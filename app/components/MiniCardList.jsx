import React, { PureComponent } from 'react';
import { Box, Text } from 'grommet';
import { Star } from 'grommet-icons';
import PropTypes from 'prop-types';
import Button from 'UI/Button';
import FocusIcon from 'UI/FocusIcon';

import './MiniCardList.scss';

class MiniCardList extends PureComponent {
  render() {
    const {
      cards, focusCard, onRemove, focusedCardId, type = 'favs', long,
    } = this.props;
    const EMPTY_TEXT = {
      favs: 'No favorite cards',
      cards: 'Press "A" to add a card',
    }[type];
    const ICON = {
      favs: <Star color="brand" />,
    }[type];
    const listItems = [];
    for (let i = 0; i < cards.length; i += 1) {
      const cardIsFocused = Boolean(focusedCardId === cards[i].id);
      listItems.push(
        <Box
          direction="row"
          align="center"
          alignContent="start"
          hoverIndicator="accent-3"
          key={`card-${cards[i].id}`}
        >
          {onRemove && (
          <Button
            plain
            className="remove-btn"
            hoverIndicator="accent-2"
            onClick={() => onRemove(cards[i])}
          >
            {ICON}
          </Button>
          )}
          <Button
            hoverIndicator="accent-3"
            color={(cardIsFocused && 'accent-3') || 'brand'}
            className="focus-btn"
            onClick={() => focusCard(cardIsFocused ? false : cards[i])}
          >
            {!onRemove && ICON}
            {cards[i].title && cards[i].title.slice(0, 20)}
          </Button>
        </Box>,
      );
    }
    return (
      <Box className={`cards-container ${long && 'long' || ''}`} direction="column">
        {cards && cards.length ? listItems : (
          <Text color="brand">
            {EMPTY_TEXT}
          </Text>
        )}
      </Box>
    );
  }
}

MiniCardList.whyDidYouRender = true;

MiniCardList.propTypes = {
  cards: PropTypes.array,
  long: PropTypes.bool,
  type: PropTypes.string,
  focusCard: PropTypes.func.isRequired,
  focusedCardId: PropTypes.string,
  onRemove: PropTypes.func,
};

MiniCardList.defaultProps = {
  cards: [],
  long: false,
  focusedCardId: '',
  onRemove: null,
  type: '',
};

export default MiniCardList;
