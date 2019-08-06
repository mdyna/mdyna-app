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

const CARD = {
  addCard,
  saveCard,
  toggleCard,
  changeTitle,
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

const SETTINGS = {
  toggleSettings,
  changeCardsPerPage,
  toggleWhiteMode,
  toggleSidebar,
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

const LABEL = {
  addLabel,
  removeLabel,
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
export const toggleCompletedFilter = value => ({
  type: ACTION_TYPES.FILTERS.TOGGLE_COMPLETED_FILTER,
  value,
});

const FILTERS = {
  searchCards,
  focusCard,
  changeSorting,
  addLabelFilter,
  removeLabelFilter,
  toggleCompletedFilter,
};

export default {
  FILTERS,
  SETTINGS,
  CARD_EDITOR,
  LABEL,
  CARD,
};
