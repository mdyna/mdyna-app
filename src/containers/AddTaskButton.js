import { connect } from 'react-redux';
import { addTask } from '../store/actions/';
import AddTaskButton from '../components/common/AddTaskButton';

function mapDispatchToProps(dispatch) {
  return { addTask: (todoProps) => {
    dispatch(addTask(todoProps));
  } };
}
function mapStateToProps(state) {
  return {
    tasks: state,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton);
