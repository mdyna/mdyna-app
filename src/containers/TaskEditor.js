import { connect } from 'react-redux';
import TaskEditor from '../components/TaskList/TaskEditor';
import { changeTaskProp } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return { changeTaskProp: (prop, value) => {
    dispatch(changeTaskProp(prop, value));
  } };
}
function mapStateToProps(state) {
  return {
    currentTask: state.editor,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
