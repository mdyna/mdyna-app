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
  return {
    searchInput: state.filters.searchInput,
    labelFilters: state.filters.labelFilters,
    completedFilterOn: state.filters.completedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    sorting: state.filters.sorting,
    order: state.filters.order,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards: state.cards,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
