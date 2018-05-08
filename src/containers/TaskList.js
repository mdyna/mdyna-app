import { connect } from 'react-redux';
import TaskList from '../components/Tasks/TaskList';
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
    tasks: state.tasks,
    modalOpen: state.editor.toggleEditor,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
