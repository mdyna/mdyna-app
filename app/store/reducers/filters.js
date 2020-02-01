import ACTION_TYPES from '../actions/actionTypes';

const {
  FOCUS_CARD,
  SEARCH_CARDS,
  ADD_LABEL_FILTER,
  REMOVE_LABEL_FILTER,
  CHANGE_ACTIVE_BOARD,
  CHANGE_SORTING_STATE,
  TOGGLE_ARCHIVED_FILTER,
} = ACTION_TYPES.FILTERS;

export default function filters(
  state = {
    searchInput: '',
    activeBoard: 'INBOX',
    archivedFilterOn: false,
    labelFilters: [],
    sorting: '',
    order: 'descending',
  },
  action,
) {
  const labelFilters = state.labelFilters || [];
  switch (action.type) {
    case SEARCH_CARDS:
      return {
        ...state,
        searchInput: action.value,
      };
    case ADD_LABEL_FILTER:
      return {
        ...state,
        labelFilters:
          (labelFilters.indexOf(action.value) === -1 && [
            ...labelFilters,
            action.value,
          ])
          || labelFilters,
      };
    case CHANGE_SORTING_STATE:
      return {
        ...state,
        sorting: action.sorting,
        order: action.order || state.order,
      };
    case FOCUS_CARD:
      return {
        ...state,
        focusedCard: action.card || null,
        isFocused: Boolean(action.card && action.card.id),
      };
    case REMOVE_LABEL_FILTER:
      return {
        ...state,
        labelFilters: state.labelFilters.filter(d => d !== action.value),
      };
    case TOGGLE_ARCHIVED_FILTER:
      return {
        ...state,
        archivedFilterOn: !state.archivedFilterOn,
      };
    case CHANGE_ACTIVE_BOARD:
      return {
        ...state,
        activeBoard: action.payload || 'INBOX',
      };
    default:
      return state;
  }
}
