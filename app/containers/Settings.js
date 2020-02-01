import { connect } from 'react-redux';
import Settings from 'Components/Settings';
import ACTIONS from 'Store/actions/';

const {
  changeTheme,
  changeCwd,
  toggleSettings,
  changeCodeTheme,
  changeCardsPerPage,
} = ACTIONS.SETTINGS;
const { createBoard, deleteBoard, changeBoardName } = ACTIONS.BOARDS;
const { deleteBoardCards, keepBoardCards } = ACTIONS.CARD;
const { changeActiveBoard } = ACTIONS.FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    changeCwd: (cwd) => {
      dispatch(changeCwd(cwd));
    },
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    changeTheme: (theme) => {
      dispatch(changeTheme(theme));
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
    deleteBoard: (board, keepCards) => {
      dispatch(deleteBoard(board));
      if (keepCards) {
        dispatch(keepBoardCards(board));
      } else {
        dispatch(deleteBoardCards(board));
      }
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
    theme: state.style.theme,
    lastSyncDate: state.settings.lastSyncDate,
    githubAuthOn: state.settings.githubAuthOn || false,
    boards: state.boards.boardList,
    boardNames: state.boards.boardNames,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
