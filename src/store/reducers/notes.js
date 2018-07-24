import ACTION_TYPES from '../actions/actionTypes';

const { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, GENERATE_LINK, SAVE_TASK } = ACTION_TYPES.TASK;

const addNoteId = noteList =>
  (noteList &&
    noteList[noteList.length - 1] &&
    noteList[noteList.length - 1].noteId &&
    noteList[noteList.length - 1].noteId + 1) ||
  (noteList && noteList.length) ||
  1;
const saveNoteId = (note, noteList) => note.noteId || addNoteId(noteList);
export default function notes(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          ...action.note,
          noteId: addNoteId(state),
          completed: false,
          reminderId: null,
        },
      ];
    case REMOVE_TASK:
      return state.filter(note => note.noteId !== action.note.noteId);
    case SAVE_TASK:
      return state.map((note) => {
        if (action.note.noteId) {
          if (note.noteId === action.note.noteId) {
            return action.note;
          }
        }
        return { noteId: saveNoteId(action.note, state), reminderId: null, ...note };
      });
    case TOGGLE_TASK:
      return state.map((note) => {
        if (note.noteId === action.note.noteId) {
          return {
            ...note,
            completed: !note.completed,
          };
        }
        return note;
      });
    case GENERATE_LINK:
      return state.map((note) => {
        if (note.noteId === action.index) {
          return {
            ...note,
            noteId: action.keys.noteId,
            shortLink: action.keys.shortLink,
          };
        }
        return note;
      });
    default:
      return state;
  }
}
