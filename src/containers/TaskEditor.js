import { connect } from 'react-redux';
import TaskEditor from '../components/Tasks/TaskEditor';
import { changeTaskSetting, saveTask, addTask, removeTask, addReminder, saveReminder } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    changeTaskSetting: (prop, value) => {
      dispatch(changeTaskSetting(prop, value));
    },
    saveTask: (task) => {
      dispatch(saveTask(task));
    },
    addTask: (todoProps) => {
      dispatch(addTask(todoProps));
    },
    removeTask: (todoProps) => {
      dispatch(removeTask(todoProps));
    },
    addReminder: (todoProps) => {
      dispatch(addReminder(todoProps));
    },
    saveReminder: (todoProps) => {
      dispatch(saveReminder(todoProps));
    },
  };
}
function mapStateToProps(state) {
  return {
    editorSettings: state.editor,
    categories: state.categories,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskEditor);
