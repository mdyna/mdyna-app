import uniqid from 'uniqid';
import ACTION_TYPES from '../actions/actionTypes';

const {
  CREATE_BOARD,
  DELETE_BOARD,
  CHANGE_BOARD_BACKGROUND,
  CHANGE_BOARD_NAME,
  TOGGLE_BOARDS_DIALOG,
} = ACTION_TYPES.BOARDS;

function deleteBoard(boardId, boardList) {
  const updatedBoardList = [];
  for (let i = 0; i < boardList.length; i += 1) {
    const currentBoardId = boardList[i].id;
    if (currentBoardId !== boardId) {
      updatedBoardList.push(boardList[currentBoardId]);
    }
  }
  return updatedBoardList;
}

export default function boards(
  state = {
    boardList: [
      {
        name: 'INBOX',
        cards: 'all',
        bg: 'default',
        labels: 'all',
      },
    ],
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
  const currentBoardName = state.boardList
    && state.boardList[boardId]
    && state.boardList[boardId].name;
  if (!newState.boardList) {
    newState.boardList = {};
  }
  if (!newState.boardNames) {
    newState.boardNames = ['INBOX'];
  }
  switch (action.type) {
    case TOGGLE_BOARDS_DIALOG:
      return {
        ...state,
        boardsDialogOpen: !state.boardsDialogOpen,
      };
    case CREATE_BOARD:
      newState.boardList.push({ id: boardId, name, cards: [] });
      return { ...newState, boardNames: [...newState.boardNames, name] };
    case DELETE_BOARD:
      newState.boardList = deleteBoard(boardId, newState.boardList);
      return {
        ...newState,
        boardNames: [
          ...newState.boardNames.filter(b => b !== currentBoardName),
        ],
      };
    case CHANGE_BOARD_NAME:
      newState.boardList = newState.boardList.map(b => ({
        name: b.id === boardId ? newName : b.name,
        ...b,
      }));
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
