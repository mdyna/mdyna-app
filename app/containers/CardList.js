import { connect } from 'react-redux';
import CardList from '../components/Cards/CardList';
import { toggleEditor } from '../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
  };
}
function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
    completedFilterOn: state.filters.completedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    labelFilters: state.filters.labelFilters,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
