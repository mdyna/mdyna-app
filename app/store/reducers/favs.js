import ACTION_TYPES from '../actions/actionTypes';

const { ADD_FAV, REMOVE_FAV, UPDATE_FAV_LIST } = ACTION_TYPES.FAV;
export default function labels(state = [], action) {
  switch (action.type) {
    case ADD_FAV:
      return [...state, action.payload];
    case UPDATE_FAV_LIST:
      return [...action.payload];
    case REMOVE_FAV:
      return state.filter(f => f !== action.payload.id);
    default:
      return state;
  }
}
