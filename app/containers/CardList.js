import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from '../components/Cards/CardList';

const { CARD_EDITOR, FILTERS, BOARDS } = ACTIONS;
const { toggleEditor } = CARD_EDITOR;
const { changeActiveBoard } = FILTERS;
const { toggleBoardsDialog, createBoard } = BOARDS;
function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
  };
}
function mapStateToProps(state) {
  const activeBoard = (state.filters && state.filters.activeBoard) || 'INBOX';
  const activeBoardName = (state.boards
      && state.boards.boards
      && state.boards.boards[activeBoard]
      && state.boards.boards[activeBoard].name)
    || 'INBOX';
  return {
    searchInput: state.filters.searchInput,
    archivedFilterOn: state.filters.archivedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    labelFilters: state.filters.labelFilters,
    boardNames: state.boards.boardNames,
    boards: state.boards.boardList,
    activeBoard: activeBoardName,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
