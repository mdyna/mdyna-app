import React, { PureComponent } from 'react';
import { Grommet, Box, Layer } from 'grommet';
import { Star } from 'grommet-icons';
import PropTypes from 'prop-types';
import Button from 'UI/Button';

class Favorites extends PureComponent {
  render() {
    const { favs, focusCard, removeFav } = this.props;
    const favoriteButtons = [];
    for (let i = 0; i < favs.length; i += 1) {
      favoriteButtons.push(
        <Button hoverIndicator="accent-3" onClick={() => focusCard(favs[i])}>
          <Button
            plain
            style={{ padding: 0, marginRight: 5 }}
            hoverIndicator="accent-2"
            onClick={() => removeFav(favs[i])}
          >
            <Star color="brand" />
          </Button>
          {favs[i].title}
        </Button>,
      );
    }
    return (
      <Box style={{ paddingLeft: '15px' }} direction="column">
        {favoriteButtons}
      </Box>
    );
  }
}

Favorites.propTypes = {
  favs: PropTypes.array,
};

Favorites.defaultProps = {
  favs: [],
};

export default Favorites;
