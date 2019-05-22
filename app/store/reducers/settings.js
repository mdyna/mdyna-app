import ACTION_TYPES from '../actions/actionTypes';

const cwd = window.cwd || '';

const { CHANGE_CWD } = ACTION_TYPES;

function changeCwd(
  state = {
    cwd,
  },
  action,
) {
  switch (action.type) {
    case CHANGE_CWD:
      return {
        cwd: action.cwd,
      };
    default:
      return state;
  }
}

export default changeCwd;
