import { connect } from 'react-redux';
import TaskPreview from '../components/Tasks/TaskPreview';

function mapStateToProps(state) {
  return {
    task: state.editor,
  };
}
export default connect(mapStateToProps)(TaskPreview);
