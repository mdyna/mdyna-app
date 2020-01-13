import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import Favorites from 'Components/Favorites';
import Selectors from 'Store/selectors';

const { favCardsSelector } = Selectors;
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
  const favs = favCardsSelector(state);
  return {
    favs,
    focusedCardId: state.filters.focusedCard && state.filters.focusedCard.id,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
