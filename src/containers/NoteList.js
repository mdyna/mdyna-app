import { connect } from 'react-redux';
import NoteList from '../components/Notes/NoteList';
import { toggleEditor, toggleWhiteMode } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
  };
}
function mapStateToProps(state) {
  return {
    notes: state.notes,
    modalOpen: state.editor.toggleEditor,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteList);
