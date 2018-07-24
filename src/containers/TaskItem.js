import { connect } from 'react-redux';
import TaskItem from '../components/Tasks/TaskItem';
import {
  generateTaskLink,
  removeTask,
  toggleTask,
  editTask,
  changeTaskSetting,
} from '../store/actions/';

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
    changeTaskSetting: (prop, value) => {
      dispatch(changeTaskSetting(prop, value));
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
