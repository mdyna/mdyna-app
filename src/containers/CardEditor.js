import { connect } from 'react-redux';
import CardEditor from '../components/CardEditor';
import {
  changeNoteSetting,
  saveNote,
  addNote,
  removeNote,
  addReminder,
  saveReminder,
  removeReminder,
} from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    changeNoteSetting: (prop, value) => {
      dispatch(changeNoteSetting(prop, value));
    },
    saveNote: (note) => {
      dispatch(saveNote(note));
    },
    addNote: (todoProps) => {
      dispatch(addNote(todoProps));
    },
    removeNote: (todoProps) => {
      dispatch(removeNote(todoProps));
    },
    addReminder: (todoProps) => {
      dispatch(addReminder(todoProps));
    },
    saveReminder: (todoProps) => {
      dispatch(saveReminder(todoProps));
    },
    removeReminder: (todoProps) => {
      dispatch(removeReminder(todoProps));
    },
  };
}
function mapStateToProps(state) {
  return {
    editorSettings: state.editor,
    categories: state.categories,
    whiteMode: state.style.whiteMode,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardEditor);
