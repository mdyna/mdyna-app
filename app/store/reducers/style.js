import ACTION_TYPES from '../actions/actionTypes';

const { TOGGLE_WHITE_MODE, TOGGLE_SIDEBAR } = ACTION_TYPES;

function toggleWhiteMode(
  state = {
    whiteMode: false,
    sidebarExpanded: false,
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_WHITE_MODE:
      return {
        ...state,
        whiteMode: !state.whiteMode,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded,
      };
    default:
      return state;
  }
}

export default toggleWhiteMode;
