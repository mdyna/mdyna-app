import { connect } from 'react-redux';
import ReminderList from '../components/Reminders/ReminderList';
import { toggleEditor } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
  };
}
function mapStateToProps(state) {
  return {
    reminders: state.reminders,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderList);
