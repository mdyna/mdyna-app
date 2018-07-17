import { connect } from 'react-redux';
import TaskItem from '../components/Tasks/TaskItem';
import { generateTaskLink, removeTask, toggleTask, editTask } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeTask: (task) => {
      dispatch(removeTask(task));
    },
    editTask: (task) => {
      dispatch(editTask(task));
    },
    generateTaskLink: (task, taskId) => {
      dispatch(generateTaskLink(task, taskId));
    },
    toggleTask: (task) => {
      dispatch(toggleTask(task));
    },
  };
}
function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskItem);
