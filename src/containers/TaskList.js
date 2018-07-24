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
    whiteMode: state.style.whiteMode,
    tasks: state.tasks,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
