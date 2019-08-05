import ACTION_TYPES from '../actions/actionTypes';

const cwd = window.cwd || '';

const { CHANGE_CWD, TOGGLE_SETTINGS, CHANGE_CPP } = ACTION_TYPES;

function settingsReducer(
  state = {
    cwd,
    settingsModal: false,
    cardsPerPage: 8,
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
    case CHANGE_CPP:
      return {
        ...state,
        cardsPerPage: action.payload,
      };
    default:
      return state;
  }
}

export default settingsReducer;
