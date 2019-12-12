import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import Favorites from 'Components/Favorites';

const { FAV, FILTERS } = ACTIONS;

const { removeFav } = FAV;
const { focusCard } = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    focusCard: (card) => {
      dispatch(focusCard(card));
    },
    removeFav: (card) => {
      dispatch(removeFav(card));
    },
  };
}

function mapStateToProps(state) {
  const favs = state.cards.filter(c => state.favs.indexOf(c.id) !== -1);
  return {
    favs,
    focusedCardId: state.filters.focusedCard && state.filters.focusedCard.id,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
