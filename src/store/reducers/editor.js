import ACTION_TYPES from '../actions/actionTypes';

const { ON_CHANGE, TOGGLE_EDITOR, EDIT_TASK } = ACTION_TYPES.TASK_EDITOR;

export default function editor(
  state = {
    title: '',
    color: '',
    category: '',
    schedule: '',
    repeat: undefined,
    newTask: true,
    shortLink: '',
    startDate: '',
    text: '',
    taskId: 0,
  },
  action,
) {
  if (action.type === ON_CHANGE) {
    const newState = { ...state };
    newState[action.prop] = action.value;
    return newState;
  }
  if (action.type === TOGGLE_EDITOR) {
    const newState = { ...state };
    newState.toggleEditor = !state.toggleEditor;
    if (state.newTask) {
      return {
        toggleEditor: !state.toggleEditor,
        newTask: true,
      };
    }
    newState.newTask = true;
    return newState;
  }
  if (action.type === EDIT_TASK) {
    const newState = { ...state, ...action.task };
    newState.toggleEditor = true;
    newState.newTask = false;
    return newState;
  }
  return state;
}
