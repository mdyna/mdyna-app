import ACTION_TYPES from './actionTypes';

//= =======================================================================================
/*                                                                                      *
 *                                        ACTIONS                                       *
 *                                                                                      */
//= =======================================================================================

// ──── CARD ACTIONS ──────────────────────────────────────────────────────────────────────

export const addCard = card => ({
  type: ACTION_TYPES.CARD.ADD_CARD,
  card,
});
export const saveCard = card => ({
  type: ACTION_TYPES.CARD.SAVE_CARD,
  card,
});
export const changeTitle = (card, title) => ({
  type: ACTION_TYPES.CARD.CHANGE_TITLE,
  card,
  payload: title,
});
export const removeCard = card => ({
  type: ACTION_TYPES.CARD.REMOVE_CARD,
  card,
});
export const toggleCard = card => ({
  type: ACTION_TYPES.CARD.TOGGLE_CARD,
  card,
});
export const updateCardList = content => ({
  type: ACTION_TYPES.CARD.UPDATE_CARD_LIST,
  content,
});

const CARD = {
  addCard,
  saveCard,
  toggleCard,
  changeTitle,
  updateCardList,
  removeCard,
};

// ──── EDITOR ACTIONS ────────────────────────────────────────────────────────────────────

export const toggleEditor = () => ({
  type: ACTION_TYPES.CARD_EDITOR.TOGGLE_EDITOR,
});

export const changeCardSetting = (prop, value) => ({
  type: ACTION_TYPES.CARD_EDITOR.ON_CHANGE,
  prop,
  value,
  meta: {
    debounce: {
      time: prop === 'text' && 500,
    },
  },
});

export const editCard = card => ({
  type: ACTION_TYPES.CARD_EDITOR.EDIT_CARD,
  card,
});

const CARD_EDITOR = {
  toggleEditor,
  editCard,
  changeCardSetting,
};

// ──── SETTINGS ACTIONS ──────────────────────────────────────────────────────────────────

export const toggleSettings = () => ({
  type: ACTION_TYPES.SETTINGS.TOGGLE_SETTINGS,
});

export const changeCodeTheme = theme => ({
  type: ACTION_TYPES.SETTINGS.CHANGE_CODE_THEME,
  payload: theme,
});

export const changeCardsPerPage = value => ({
  type: ACTION_TYPES.SETTINGS.CHANGE_CPP,
  payload: value,
});

export const toggleWhiteMode = () => ({
  type: ACTION_TYPES.SETTINGS.TOGGLE_WHITE_MODE,
});

export const toggleSidebar = () => ({
  type: ACTION_TYPES.SETTINGS.TOGGLE_SIDEBAR,
});

export const changeCwd = cwd => ({
  type: ACTION_TYPES.SETTINGS.CHANGE_CWD,
  cwd,
});
export const syncCardsSuccess = () => ({
  type: ACTION_TYPES.SETTINGS.SYNC_CARDS_SUCCESS,
});

export const syncCardsFail = () => ({
  type: ACTION_TYPES.SETTINGS.SYNC_CARDS_FAIL,
});

export const syncCards = () => ({
  type: ACTION_TYPES.SETTINGS.SYNC_CARDS,
});

export const loginToGhSuccess = () => ({
  type: ACTION_TYPES.SETTINGS.LOGIN_TO_GH_SUCCESS,
});

export const loginToGhFail = () => ({
  type: ACTION_TYPES.SETTINGS.LOGIN_TO_GH_FAIL,
});

export const loginToGh = (username, pw) => ({
  type: ACTION_TYPES.SETTINGS.LOGIN_TO_GH,
  payload: {
    username,
    password: pw,
  },
});

export const updateGist = gistId => ({
  type: ACTION_TYPES.SETTINGS.UPDATE_GIST,
  payload: {
    gistId,
  },
});

export const updateDeletedCards = cardId => ({
  type: ACTION_TYPES.SETTINGS.UPDATE_DELETED_CARDS,
  payload: cardId,
});

const SETTINGS = {
  changeCodeTheme,
  toggleSettings,
  changeCardsPerPage,
  loginToGhSuccess,
  loginToGhFail,
  loginToGh,
  syncCardsSuccess,
  syncCardsFail,
  syncCards,
  updateGist,
  toggleWhiteMode,
  toggleSidebar,
  updateDeletedCards,
  changeCwd,
};

// ──── LABEL ACTIONS ─────────────────────────────────────────────────────────────────────

export const addLabel = label => ({
  type: ACTION_TYPES.LABEL.ADD_LABEL,
  label,
});

export const removeLabel = label => ({
  type: ACTION_TYPES.LABEL.REMOVE_LABEL,
  label,
});

export const updateLabelList = content => ({
  type: ACTION_TYPES.LABEL.UPDATE_LABEL_LIST,
  content,
});

const LABEL = {
  addLabel,
  removeLabel,
  updateLabelList,
};

// ──── BOARDS ────────────────────────────────────────────────────────────────────────────

export const createBoard = name => ({
  type: ACTION_TYPES.BOARDS.CREATE_BOARD,
  payload: {
    name,
  },
});

export const deleteBoard = board => ({
  type: ACTION_TYPES.BOARDS.DELETE_BOARD,
  payload: {
    board,
  },
});

export const changeBoardBackground = (board, bg) => ({
  type: ACTION_TYPES.BOARDS.CHANGE_BOARD_BACKGROUND,
  payload: {
    board,
    bg,
  },
});

export const toggleBoardsDialog = () => ({
  type: ACTION_TYPES.BOARDS.TOGGLE_BOARDS_DIALOG,
});

export const changeBoardName = (board, newName) => ({
  type: ACTION_TYPES.BOARDS.CHANGE_BOARD_NAME,
  payload: {
    board,
    newName,
  },
});

export const updateBoardList = content => ({
  type: ACTION_TYPES.BOARDS.UPDATE_BOARDS_LIST,
  payload: { content },
});

const BOARDS = {
  createBoard,
  updateBoardList,
  changeBoardName,
  toggleBoardsDialog,
  deleteBoard,
  changeBoardBackground,
};

// ──── FILTER ACTIONS ────────────────────────────────────────────────────────────────────

export const searchCards = value => ({
  type: ACTION_TYPES.FILTERS.SEARCH_CARDS,
  value,
  meta: {
    debounce: {
      time: 500,
    },
  },
});
export const focusCard = card => ({
  type: ACTION_TYPES.FILTERS.FOCUS_CARD,
  card,
});

export const changeActiveBoard = board => ({
  type: ACTION_TYPES.FILTERS.CHANGE_ACTIVE_BOARD,
  payload: board,
});
export const changeSorting = (sorting, order) => ({
  type: ACTION_TYPES.FILTERS.CHANGE_SORTING_STATE,
  sorting,
  order,
});
export const addLabelFilter = value => ({
  type: ACTION_TYPES.FILTERS.ADD_LABEL_FILTER,
  value,
});
export const removeLabelFilter = value => ({
  type: ACTION_TYPES.FILTERS.REMOVE_LABEL_FILTER,
  value,
});
export const toggleArchivedFilter = value => ({
  type: ACTION_TYPES.FILTERS.TOGGLE_ARCHIVED_FILTER,
  value,
});

const FILTERS = {
  searchCards,
  focusCard,
  changeSorting,
  changeActiveBoard,
  addLabelFilter,
  removeLabelFilter,
  toggleArchivedFilter,
};

export default {
  FILTERS,
  SETTINGS,
  CARD_EDITOR,
  BOARDS,
  LABEL,
  CARD,
};
