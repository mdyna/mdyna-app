import ACTION_TYPES from '../actions/actionTypes';

const { ON_CHANGE } = ACTION_TYPES.TASK_EDITOR;

export default function editor(
  state = {
    title: '',
    color: '',
    category: '',
    schedule: '',
    repeat: undefined,
    text: '',
  },
  action,
) {
  if (action.type === ON_CHANGE) {
    const newState = { ...state };
    newState[action.prop] = action.value;
    return newState;
  }
  return state;
}
