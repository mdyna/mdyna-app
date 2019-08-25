import { connect } from 'react-redux';
import Settings from 'Components/Settings';
import ACTIONS from 'Store/actions/';

const {
  toggleWhiteMode,
  changeCwd,
  toggleSettings,
  changeCodeTheme,
  changeCardsPerPage,
} = ACTIONS.SETTINGS;
const { createBoard, deleteBoard, changeBoardName } = ACTIONS.BOARDS;
const { changeActiveBoard } = ACTIONS.FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    changeCwd: (cwd) => {
      dispatch(changeCwd(cwd));
    },
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    changeCardsPerPage: (val) => {
      dispatch(changeCardsPerPage(val));
    },
    changeCodeTheme: (val) => {
      dispatch(changeCodeTheme(val));
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
    changeBoardName: (board, newName) => {
      dispatch(changeBoardName(board, newName));
    },
  };
}

function mapStateToProps(state) {
  return {
    cwd: state.settings.cwd,
    activeBoard: state.filters.activeBoard,
    codeTheme: state.settings.codeTheme,
    settingsModal: state.settings.settingsModal,
    whiteMode: state.style.whiteMode,
    boards: state.boards.boards,
    boardNames: state.boards.boardNames,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
