import { connect } from 'react-redux';
import CardEditor from '../components/CardEditor';
import {
  changeNoteSetting,
  saveNote,
  addNote,
  removeNote,
  addTask,
  saveTask,
  removeTask,
  addLabel,
  removeLabel,
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
    addTask: (todoProps) => {
      dispatch(addTask(todoProps));
    },
    saveTask: (todoProps) => {
      dispatch(saveTask(todoProps));
    },
    removeTask: (todoProps) => {
      dispatch(removeTask(todoProps));
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
  return {
    editorSettings: state.editor,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardEditor);
