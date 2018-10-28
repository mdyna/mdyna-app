import { connect } from 'react-redux';
import TaskItem from '../components/Tasks/TaskItem';
import {
  snoozeTask,
  removeTask,
  completeTask,
  failTask,
  addLabel,
  removeLabel,
  editNote,
} from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeTask: (task) => {
      dispatch(removeTask(task));
    },
    editTask: (task) => {
      dispatch(editNote(task));
    },
    snoozeTask: (task, noteId) => {
      dispatch(snoozeTask(task, noteId));
    },
    failTask: (task) => {
      dispatch(failTask(task));
    },
    addLabel: (todoProps) => {
      dispatch(addLabel(todoProps));
    },
    removeLabel: (todoProps) => {
      dispatch(removeLabel(todoProps));
    },
    completeTask: (task) => {
      dispatch(completeTask(task));
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
