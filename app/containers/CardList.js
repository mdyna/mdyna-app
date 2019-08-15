import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from '../components/Cards/CardList';

const { CARD_EDITOR, BOARDS, FILTERS } = ACTIONS;
const { toggleEditor } = CARD_EDITOR;
const { createBoard, deleteBoard } = BOARDS;
const { changeActiveBoard } = FILTERS;
function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
    deleteBoard: (board) => {
      dispatch(deleteBoard(board));
    },
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
  };
}
function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
    archivedFilterOn: state.filters.archivedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    labelFilters: state.filters.labelFilters,
    boards: state.boards.boards,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
