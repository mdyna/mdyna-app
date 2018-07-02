import { connect } from 'react-redux';
import ReminderItem from '../components/Reminders/ReminderItem';
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
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderItem);
