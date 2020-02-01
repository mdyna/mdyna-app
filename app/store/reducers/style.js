import ACTION_TYPES from '../actions/actionTypes';

const { TOGGLE_WHITE_MODE, TOGGLE_SIDEBAR, CHANGE_THEME } = ACTION_TYPES.SETTINGS;
const THEMES = {
  DARK: 'dark',
  WHITE: 'dark',
};

function styleReducer(
  state = {
    theme: THEMES.DARK,
    sidebarExpanded: false,
  },
  action,
) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
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

export default styleReducer;
