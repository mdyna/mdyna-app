import ACTION_TYPES from '../actions/actionTypes';

const { ON_CHANGE, TOGGLE_EDITOR, EDIT_TASK } = ACTION_TYPES.TASK_EDITOR;

export default function editor(
  state = {
    title: '',
    color: '',
    repeat: false,
    newTask: true,
    shortLink: '',
    startDate: '',
    text: '',
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
    const newEditorState = !state.toggleEditor;
    if (newState.newTask) {
      return {
        toggleEditor: newEditorState,
        newTask: true,
      };
    }
    newState.newTask = true;
    newState.toggleEditor = newEditorState;
    return newState;
  }
  if (action.type === EDIT_TASK) {
    const newState = { reminderId: null, taskId: null, ...action.task };
    newState.toggleEditor = true;
    newState.newTask = false;
    return newState;
  }
  return state;
}
