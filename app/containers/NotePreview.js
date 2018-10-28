import { connect } from 'react-redux';
import NotePreview from '../components/Notes/NotePreview';

function mapStateToProps(state) {
  return {
    note: state.editor,
  };
}
export default connect(mapStateToProps)(NotePreview);
