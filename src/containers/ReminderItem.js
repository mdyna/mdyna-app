import { connect } from 'react-redux';
import ReminderItem from '../components/Reminders/ReminderItem';
import {
  snoozeReminder,
  removeReminder,
  completeReminder,
  failReminder,
  editNote,
} from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeReminder: (reminder) => {
      dispatch(removeReminder(reminder));
    },
    editReminder: (reminder) => {
      dispatch(editNote(reminder));
    },
    snoozeReminder: (reminder, noteId) => {
      dispatch(snoozeReminder(reminder, noteId));
    },
    failReminder: (reminder) => {
      dispatch(failReminder(reminder));
    },
    completeReminder: (reminder) => {
      dispatch(completeReminder(reminder));
    },
  };
}
function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReminderItem);
