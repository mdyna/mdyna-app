import { connect } from 'react-redux';
import TaskEditor from '../components/Tasks/TaskEditor';
import { changeTaskSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    changeTaskSetting: (prop, value) => {
      dispatch(changeTaskSetting(prop, value));
    },
  };
}
function mapStateToProps(state) {
  return {
    editorSettings: state.editor,
    categories: state.categories,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
