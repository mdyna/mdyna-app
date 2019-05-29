import ACTION_TYPES from '../actions/actionTypes';

const {
  SEARCH_CARDS,
  ADD_LABEL_FILTER,
  REMOVE_LABEL_FILTER,
  CHANGE_SORTING_STATE,
  TOGGLE_COMPLETED_FILTER,
} = ACTION_TYPES.FILTERS;

export default function notes(
  state = {
    searchInput: '',
    completedFilterOn: false,
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
            labelFilters,
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
    case REMOVE_LABEL_FILTER:
      return {
        ...state,
        labelFilters: state.labelFilters.filter(d => d !== action.value),
      };
    case TOGGLE_COMPLETED_FILTER:
      return {
        ...state,
        completedFilterOn: !state.completedFilterOn,
      };
    default:
      return state;
  }
}
