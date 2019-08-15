import ACTION_TYPES from '../actions/actionTypes';

const {
  CREATE_BOARD,
  DELETE_BOARD,
  CHANGE_BOARD_BACKGROUND,
} = ACTION_TYPES.BOARDS;

export default function boards(
  state = {
    INBOX: {
      cards: 'all',
      bg: 'default',
      labels: 'all',
    },
  },
  action,
) {
  if (action && action.payload) {
    const { board, bg } = action && action.payload;
    const boardName = board && board.name;
    const newState = {
      ...state,
    };
    switch (action.type) {
      case CREATE_BOARD:
        newState[boardName] = board;
        return newState;
      case DELETE_BOARD:
        delete newState[boardName];
        return newState;
      case CHANGE_BOARD_BACKGROUND:
        newState[boardName].bg = bg;
        return newState;
      default:
        return newState;
    }
  }
  return state;
}
