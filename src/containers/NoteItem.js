import { connect } from 'react-redux';
import NoteItem from '../components/Notes/NoteItem';
import {
  generateNoteLink,
  removeNote,
  toggleNote,
  editNote,
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
  };
}
function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteItem);
