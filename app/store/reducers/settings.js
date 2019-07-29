import ACTION_TYPES from '../actions/actionTypes';

const cwd = window.cwd || '';

const { CHANGE_CWD, TOGGLE_SETTINGS } = ACTION_TYPES;

function settingsReducer(
  state = {
    cwd,
    settingsModal: false,
  },
  action,
) {
  switch (action.type) {
    case CHANGE_CWD:
      return {
        ...state,
        cwd: action.cwd,
      };
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settingsModal: !state.settingsModal,
      };
    default:
      return state;
  }
}

export default settingsReducer;
