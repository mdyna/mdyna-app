import { connect } from 'react-redux';
import TaskEditor from '../components/TaskList/TaskEditor';
import { changeTaskSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return { changeTaskSetting: (prop, value) => {
    dispatch(changeTaskSetting(prop, value));
  } };
}
function mapStateToProps(state) {
  return {
    editorSettings: state.editor,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
