import ACTION_TYPES from '../actions/actionTypes';

const { ON_CHANGE, TOGGLE_EDITOR, EDIT_CARD } = ACTION_TYPES.CARD_EDITOR;

export default function editor(
  state = {
    title: '',
    color: '',
    repeat: false,
    newCard: true,
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
    if (newState.newCard) {
      return {
        toggleEditor: newEditorState,
        newCard: true,
      };
    }
    newState.newCard = true;
    newState.toggleEditor = newEditorState;
    return newState;
  }
  if (action.type === EDIT_CARD) {
    const newState = { id: null, ...action.card };
    newState.toggleEditor = true;
    newState.newCard = false;
    return newState;
  }
  return state;
}
