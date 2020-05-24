import React, { PureComponent } from 'react';
import { Box } from 'grommet';
import { Star } from 'grommet-icons';
import PropTypes from 'prop-types';
import Button from 'UI/Button';

import './Favorites.scss';

class Favorites extends PureComponent {
  render() {
    const {
      favs, focusCard, removeFav, focusedCardId,
    } = this.props;
    const favoriteButtons = [];
    for (let i = 0; i < favs.length; i += 1) {
      const cardIsFocused = Boolean(focusedCardId === favs[i].id);
      favoriteButtons.push(
        <Box
          direction="row"
          hoverIndicator="accent-3"
          key={`fav-${favs[i].id}`}
        >
          <Button
            plain
            className="remove-btn"
            hoverIndicator="accent-2"
            onClick={() => removeFav(favs[i])}
          >
            <Star color="brand" />
          </Button>
          <Button
            hoverIndicator="accent-3"
            color={(cardIsFocused && 'accent-3') || 'brand'}
            className="focus-btn"
            onClick={() => focusCard(cardIsFocused ? false : favs[i])}
          >
            {favs[i].title && favs[i].title.slice(0, 20)}
          </Button>
        </Box>,
      );
    }
    return (
      <Box className="favs-container" direction="column">
        {favs && favs.length ? favoriteButtons : 'No favorite cards'}
      </Box>
    );
  }
}

Favorites.whyDidYouRender = true;

Favorites.propTypes = {
  favs: PropTypes.array,
  focusCard: PropTypes.func.isRequired,
  focusedCardId: PropTypes.string,
  removeFav: PropTypes.func.isRequired,
};

Favorites.defaultProps = {
  favs: [],
  focusedCardId: '',
};

export default Favorites;
