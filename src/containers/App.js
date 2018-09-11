import { connect } from 'react-redux';
import App from '../components/App';
import { toggleWhiteMode, toggleEditor, searchCards, addLabelFilter, removeLabelFilter } from '../store/actions/';

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
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}
function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
    labelFilters: state.filters.labelFilters,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    tasks: state.tasks,
    notes: state.notes,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
