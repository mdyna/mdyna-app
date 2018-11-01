import { connect } from 'react-redux';
import NoteItem from '../components/Notes/NoteItem';
import {
  generateNoteLink,
  removeNote,
  toggleNote,
  editNote,
  addLabel,
  removeLabel,
  changeNoteSetting,
} from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeNote: (note) => {
      dispatch(removeNote(note));
    },
    editNote: (note) => {
      dispatch(editNote(note));
    },
    generateNoteLink: (note, noteId) => {
      dispatch(generateNoteLink(note, noteId));
    },
    toggleNote: (note) => {
      dispatch(toggleNote(note));
    },
    changeNoteSetting: (prop, value) => {
      dispatch(changeNoteSetting(prop, value));
    },
    addLabel: (todoProps) => {
      dispatch(addLabel(todoProps));
    },
    removeLabel: (todoProps) => {
      dispatch(removeLabel(todoProps));
    },
  };
}
function mapStateToProps(state) {
  return { whiteMode: state.style.whiteMode };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
