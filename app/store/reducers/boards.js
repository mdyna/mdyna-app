import uniqid from 'uniqid';
import ACTION_TYPES from '../actions/actionTypes';

const {
  CREATE_BOARD,
  DELETE_BOARD,
  CHANGE_BOARD_BACKGROUND,
  CHANGE_BOARD_NAME,
  TOGGLE_BOARDS_DIALOG,
} = ACTION_TYPES.BOARDS;

export default function boards(
  state = {
    boardList: {
      INBOX: {
        name: 'INBOX',
        cards: 'all',
        bg: 'default',
        labels: 'all',
      },
    },
    boardsDialogOpen: false,
    boardNames: ['INBOX'],
  },
  action,
) {
  const {
    name, newName, bg, board,
  } = (action && action.payload) || '';
  const boardId = board || uniqid();
  const newState = {
    ...state,
  };
  if (newState.boardList) {
    const currentBoardName = state.boardList[boardId] && state.boardList[boardId].name;
    switch (action.type) {
      case TOGGLE_BOARDS_DIALOG:
        return {
          ...state,
          boardsDialogOpen: !state.boardsDialogOpen,
        };
      case CREATE_BOARD:
        newState.boardList[boardId] = { name, cards: [] };
        return { ...newState, boardNames: [...newState.boardNames, name] };
      case DELETE_BOARD:
        delete newState.boardList[boardId];
        return {
          ...newState,
          boardNames: [
            ...newState.boardNames.filter(b => b !== currentBoardName),
          ],
        };
      case CHANGE_BOARD_NAME:
        newState.boardList[boardId] = {
          ...newState.boardList[boardId],
          name: newName,
        };
        return {
          ...newState,
          boardNames: [
            ...newState.boardNames.filter(b => b !== currentBoardName),
            newName,
          ],
        };
      case CHANGE_BOARD_BACKGROUND:
        newState.boardList[boardId] = {
          ...newState.boardList[boardId],
          bg,
        };
        return newState;
      default:
        return newState;
    }
  }
  return {
    ...state,
    boardList: state.boards,
  };
}
