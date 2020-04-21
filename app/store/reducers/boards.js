import uniqid from 'uniqid';
import ACTION_TYPES from '../actions/actionTypes';

const {
  CREATE_BOARD,
  DELETE_BOARD,
  // CHANGE_BOARD_BACKGROUND,
  CHANGE_BOARD_NAME,
  UPDATE_BOARDS_LIST,
  TOGGLE_BOARDS_DIALOG,
} = ACTION_TYPES.BOARDS;

function deleteBoard(boardId, boardList) {
  const updatedBoardList = [];
  for (let i = 0; i < boardList.length; i += 1) {
    const currentBoardId = boardList[i] && boardList[i].id;
    if (currentBoardId && currentBoardId !== boardId) {
      updatedBoardList.push(boardList[i]);
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
    name, newName, board, content,
  } = (action && action.payload) || '';
  const boardId = board || uniqid();
  const newState = {
    ...state,
  };

  if (!newState.boardNames) {
    newState.boardNames = ['INBOX'];
  }
  const uniqBoardNames = [
    ...new Set([
      ...((state && state.boardNames) || []),
      ...((content && content.boardNames) || []),
      'INBOX',
    ]),
  ];
  const convertedBoards = [];
  switch (action.type) {
    case UPDATE_BOARDS_LIST:
      if (content && content.boardList) {
        if (!Array.isArray(content.boardList)) {
          const contentBoards = Object.keys(content.boardList);
          for (let i = 0; i < contentBoards.length; i += 1) {
            const contentBoard = content.boardList[contentBoards[i]];
            if (
              convertedBoards.map(b => b.name).indexOf(contentBoard.name) === -1
            ) {
              convertedBoards.push({
                name: contentBoard.name,
                id: contentBoard.id || uniqid(),
              });
            }
          }
        } else {
          for (let i = 0; i < content.boardList.length; i += 1) {
            const contentBoard = content.boardList[i];
            if (contentBoard.name !== 'INBOX') {
              convertedBoards.push(contentBoard);
            }
          }
        }
      }
      return {
        ...state,
        boardNames: uniqBoardNames,
        boardList: convertedBoards,
      };
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
        boardNames: newState.boardList.map(b => b && b.name),
      };
    case CHANGE_BOARD_NAME:
      newState.boardList = newState.boardList.map(b => ({
        ...b,
        name: b.id === boardId ? newName : b.name,
      }));
      return {
        ...newState,
        boardNames: newState.boardList.map(b => b.name),
      };
    default:
      return newState;
  }
}
