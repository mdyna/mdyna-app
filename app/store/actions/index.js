import ACTION_TYPES from './actionTypes';

//= =======================================================================================
/*                                                                                      *
 *                                        ACTIONS                                       *
 *                                                                                      */
//= =======================================================================================

// ──── CARD ACTIONS ──────────────────────────────────────────────────────────────────────

export const addCard = (board, card) => ({
  type: ACTION_TYPES.CARD.ADD_CARD,
  board,
  card,
  meta: {
    debounce: {
      time: 1000,
    },
  },
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
export const discardCardChanges = card => ({
  type: ACTION_TYPES.CARD.DISCARD_CHANGES,
  card,
});
export const editCard = card => ({
  type: ACTION_TYPES.CARD.EDIT_CARD,
  card,
});
export const changeCardSetting = (prop, value, cardId) => ({
  type: ACTION_TYPES.CARD.CHANGE_CARD_SETTING,
  prop,
  value,
  cardId,
  meta: {
    debounce: {
      time: (prop === 'editingText' || prop === 'editingTitle') && 250,
    },
  },
});

const CARD = {
  addCard,
  saveCard,
  toggleCard,
  changeTitle,
  changeCardSetting,
  discardCardChanges,
  updateCardList,
  editCard,
  removeCard,
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

export const desyncGh = () => ({
  type: ACTION_TYPES.SETTINGS.DESYNC_GH,
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
  desyncGh,
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

// ──── FAV ACTIONS ─────────────────────────────────────────────────────────────────────

export const addFav = label => ({
  type: ACTION_TYPES.FAV.ADD_FAV,
  label,
});

export const removeFav = label => ({
  type: ACTION_TYPES.FAV.REMOVE_FAV,
  label,
});

export const updateFavList = content => ({
  type: ACTION_TYPES.FAV.UPDATE_FAV_LIST,
  content,
});

const FAV = {
  addFav,
  removeFav,
  updateFavList,
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
  meta: {
    debounce: {
      time: 500,
    },
  },
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
  FAV,
  BOARDS,
  LABEL,
  CARD,
};
