import React from 'react';
import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import MiniCardList from 'Components/MiniCardList';
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
    onRemove: (card) => {
      dispatch(removeFav(card));
    },
  };
}

function mapStateToProps(state) {
  const favs = favCardsSelector(state);
  return {
    type: 'favs',
    cards: favs,
    focusedCardId: state.filters.focusedCard && state.filters.focusedCard.id,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(MiniCardList));
