import { connect } from 'react-redux';
import Search from 'UI/Search';
import ACTIONS from 'Store/actions';
import Selectors from 'Store/selectors';

const { titlesSelector } = Selectors;

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
  const titles = titlesSelector(state);
  return {
    searchInput: state.filters.searchInput,
    activeBoard: state.filters.activeBoard,
    hidden: state.filters.isFocused,
    titles,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
