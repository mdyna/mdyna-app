import ACTION_TYPES from '../actions/actionTypes';

const {
  CREATE_BOARD,
  DELETE_BOARD,
  CHANGE_BOARD_BACKGROUND,
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
  const name = action && action.payload && action.payload.name;
  const bg = action && action.payload && action.payload.bg;
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
      newState.boards[name] = {};
      newState.boards[name] = action.payload;
      return newState;
    case DELETE_BOARD:
      delete newState.boards[name];
      return newState;
    case CHANGE_BOARD_BACKGROUND:
      newState.boards[name].bg = bg;
      return newState;
    default:
      return newState;
  }
}
