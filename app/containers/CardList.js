import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from 'Components/Cards/CardList';

const { FILTERS, BOARDS, CARD } = ACTIONS;
const { changeActiveBoard } = FILTERS;
const { addCard } = CARD;
const { toggleBoardsDialog, createBoard } = BOARDS;

function mapDispatchToProps(dispatch) {
  return {
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
    addCard: (activeBoard, card) => dispatch(addCard(activeBoard, card)),
  };
}
function mapStateToProps(state) {
  const activeBoard = (state.filters && state.filters.activeBoard) || 'INBOX';
  let activeBoardName = 'INBOX';
  for (let i = 0; i < state.boards.boardList.length; i += 1) {
    const board = state.boards.boardList[i];
    if (board && board.id === activeBoard) {
      activeBoardName = board.name;
    }
  }
  return {
    searchInput: state.filters.searchInput,
    archivedFilterOn: state.filters.archivedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    labelFilters: state.filters.labelFilters,
    boardNames: state.boards.boardNames,
    boards: state.boards.boardList,
    activeBoard: activeBoardName,
    activeBoardId: state.filters.activeBoard,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
