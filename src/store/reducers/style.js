import ACTION_TYPES from '../actions/actionTypes';

const { TOGGLE_WHITE_MODE } = ACTION_TYPES;

function toggleWhiteMode(
  state = {
    whiteMode: false,
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_WHITE_MODE:
      return {
        ...state,
        whiteMode: !state.whiteMode,
      };
    default:
      return state;
  }
}

export default toggleWhiteMode;
