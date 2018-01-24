import { VisibilityFilters } from '../actions/actions';
import { ACTION_TYPES } from '../actions/actionTypes';

const { SET_VISIBILITY_FILTER } = ACTION_TYPES;
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const filters = { visibilityFilter };
export default filters;
