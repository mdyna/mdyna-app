import { connect } from 'react-redux';
import sortBy from 'lodash.sortby';
import App from 'Components/App';
import {
  toggleWhiteMode,
  toggleSidebar,
  toggleEditor,
  searchCards,
  addLabelFilter,
  removeLabelFilter,
  changeSorting,
  toggleCompletedFilter,
} from 'Store/actions/';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  DESCENDING_ORDER,
} from 'Utils/globals';

function mapDispatchToProps(dispatch) {
  return {
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
    changeSorting: (sorting, order) => {
      dispatch(changeSorting(sorting, order));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    toggleCompletedFilter: (val) => {
      dispatch(toggleCompletedFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}
function mapStateToProps(state) {
  function sortCards(cards) {
    const { order, sorting } = state.filters;
    let sortedCards = cards;
    if (sorting) {
      const sortingType = sorting === SORTING_BY_TITLE ? SORTING_BY_TITLE : SORTING_BY_DATE;
      sortedCards = sortBy(sortedCards, sortingType);
    }
    if (order && order === DESCENDING_ORDER) {
      sortedCards.reverse();
    }
    return sortedCards;
  }

  return {
    searchInput: state.filters.searchInput,
    labelFilters: state.filters.labelFilters,
    completedFilterOn: state.filters.completedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    sorting: state.filters.sorting || SORTING_BY_DATE,
    order: state.filters.order || DESCENDING_ORDER,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards: sortCards(state.cards),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
