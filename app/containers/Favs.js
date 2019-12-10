import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import Favorites from '../components/Favorites';

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
  const favIds = state.favs.map(f => f.id);
  const favs = state.cards.filter(c => favIds.indexOf(c.id) !== -1);
  return {
    favs,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favorites);
