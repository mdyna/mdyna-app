import { connect } from 'react-redux';
import CardList from '../components/Cards/CardList';
import { toggleEditor, toggleWhiteMode } from '../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
  };
}
function mapStateToProps(state) {
  return {
    cards: state.cards,
    searchInput: state.filters.searchInput,
    completedFilterOn: state.filters.completedFilterOn,
    modalOpen: state.editor.toggleEditor,
    whiteMode: state.style.whiteMode,
    labelFilters: state.filters.labelFilters,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);