import { connect } from 'react-redux';
import App from '../components/App';
import { toggleWhiteMode, toggleEditor, searchCards } from '../store/actions/';

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
  };
}
function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
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
