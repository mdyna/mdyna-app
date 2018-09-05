import ACTION_TYPES from '../actions/actionTypes';

const { SEARCH_CARDS } = ACTION_TYPES.FILTERS;

export default function notes(state = {
  searchInput: '',

}, action) {
  switch (action.type) {
    case SEARCH_CARDS:
      return {
        ...state,
        searchInput: action.value,
      };
    default:
      return state;
  }
}
