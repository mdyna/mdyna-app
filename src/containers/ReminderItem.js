import { connect } from 'react-redux';
import ReminderItem from '../components/Reminders/ReminderItem';
import { snoozeReminder, removeReminder, completeReminder, failReminder, editTask } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeReminder: (reminder) => {
      dispatch(removeReminder(reminder));
    },
    editReminder: (reminder) => {
      dispatch(editTask(reminder));
    },
    snoozeReminder: (reminder, taskId) => {
      dispatch(snoozeReminder(reminder, taskId));
    },
    failReminder: (reminder) => {
      dispatch(failReminder(reminder));
    },
    completeReminder: (reminder) => {
      dispatch(completeReminder(reminder));
    },
  };
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderItem);
