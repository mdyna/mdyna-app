import { connect } from 'react-redux';
import Search from 'UI/Search';
import ACTIONS from 'Store/actions/';

const { FILTERS } = ACTIONS;

const { searchCards } = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    onChange: (val) => {
      dispatch(searchCards(val));
    },
  };
}

function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
    activeBoard: state.filters.activeBoard,
    hidden: state.filters.isFocused,
    titles: [...new Set(state.cards?.map(c => c.title))],
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
