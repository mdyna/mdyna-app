import { connect } from 'react-redux';
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
  console.log(state.filters.order)
  return {
    searchInput: state.filters.searchInput,
    labelFilters: state.filters.labelFilters,
    completedFilterOn: state.filters.completedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    sorting: state.filters.sorting || SORTING_BY_DATE,
    order: state.filters.order || DESCENDING_ORDER,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards: state.cards,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
