import { connect } from 'react-redux';
import BoardsDialog from 'Components/BoardsDialog';
import ACTIONS from 'Store/actions/';

const { FILTERS, BOARDS, CARD } = ACTIONS;

const { deleteBoardCards, keepBoardCards } = CARD;

const {
  toggleBoardsDialog,
  createBoard,
  deleteBoard,
  changeBoardName,
} = BOARDS;

const { changeActiveBoard } = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
    deleteBoard: (board, keepCards) => {
      dispatch(deleteBoard(board));
      if (keepCards) {
        dispatch(keepBoardCards(board));
      } else {
        dispatch(deleteBoardCards(board));
      }
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    changeBoardName: (board, newName) => {
      dispatch(changeBoardName(board, newName));
    },
  };
}

function mapStateToProps(state) {
  return {
    activeBoard: state.filters.activeBoard,
    boards: state.boards.boardList,
    boardNames: state.boards.boardNames,
    boardsDialogOpen: state.boards.boardsDialogOpen,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsDialog);
