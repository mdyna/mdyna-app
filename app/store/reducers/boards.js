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
        cards: 'all',
        bg: 'default',
        labels: 'all',
      },
    },
    boardsDialogOpen: false,
  },
  action,
) {
  const name = (action && action.payload && action.payload.board)
    || (action && action.payload);
  const bg = action && action.payload && action.payload.bg;
  const newName = action && action.payload && action.payload.newName;
  const newState = {
    ...state,
  };
  switch (action.type) {
    case TOGGLE_BOARDS_DIALOG:
      return {
        ...state,
        boardsDialogOpen: !state.boardsDialogOpen,
      };
    case CREATE_BOARD:
      newState.boards[name] = { name: action.payload, cards: [] };
      return newState;
    case DELETE_BOARD:
      delete newState.boards[name];
      return newState;
    case CHANGE_BOARD_NAME:
      newState.boards[newName] = {};
      newState.boards[newName] = newState.boards[name];
      delete newState.boards[name];
      return newState;
    case CHANGE_BOARD_BACKGROUND:
      newState.boards[name].bg = bg;
      return newState;
    default:
      return newState;
  }
}
