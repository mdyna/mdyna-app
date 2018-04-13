import { connect } from 'react-redux';
import TaskList from '../components/Tasks/TaskList';
import { addTask, generateTaskLink } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    addTask: (todoProps) => {
      dispatch(addTask(todoProps));
    },
    generateTaskLink: (task, taskId) => {
      dispatch(generateTaskLink(task, taskId));
    },
  };
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
