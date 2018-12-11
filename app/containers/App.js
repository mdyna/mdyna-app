import { connect } from 'react-redux';
import App from '../components/App';
import { toggleWhiteMode, toggleEditor, searchCards, addLabelFilter, removeLabelFilter, toggleCompletedFilter } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
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
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards: state.cards,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
