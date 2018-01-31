import { connect } from 'react-redux';
import TaskList from '../components/common/TaskList';
import { addTask } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return { addTask: (todoProps) => {
    dispatch(addTask(todoProps));
  } };
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
