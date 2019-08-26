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
    boards: {
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
  const currentBoardName = state.boards && state.boards[boardId] && state.boards[boardId].name;
  switch (action.type) {
    case TOGGLE_BOARDS_DIALOG:
      return {
        ...state,
        boardsDialogOpen: !state.boardsDialogOpen,
      };
    case CREATE_BOARD:
      newState.boards[boardId] = { name, cards: [] };
      return { ...newState, boardNames: [...newState.boardNames, name] };
    case DELETE_BOARD:
      delete newState.boards[boardId];
      return {
        ...newState,
        boardNames: [
          ...newState.boardNames.filter(b => b !== currentBoardName),
        ],
      };
    case CHANGE_BOARD_NAME:
      newState.boards[boardId] = {
        ...newState.boards[boardId],
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
      newState.boards[boardId] = {
        ...newState.boards[boardId],
        bg,
      };
      return newState;
    default:
      return newState;
  }
}
