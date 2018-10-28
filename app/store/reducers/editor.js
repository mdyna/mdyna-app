import ACTION_TYPES from '../actions/actionTypes';

const { ON_CHANGE, TOGGLE_EDITOR, EDIT_NOTE } = ACTION_TYPES.NOTE_EDITOR;

export default function editor(
  state = {
    title: '',
    color: '',
    repeat: false,
    newNote: true,
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
    if (newState.newNote) {
      return {
        toggleEditor: newEditorState,
        newNote: true,
      };
    }
    newState.newNote = true;
    newState.toggleEditor = newEditorState;
    return newState;
  }
  if (action.type === EDIT_NOTE) {
    const newState = { taskId: null, noteId: null, ...action.note };
    newState.toggleEditor = true;
    newState.newNote = false;
    return newState;
  }
  return state;
}
