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
function filterTasks(tasks, input) {
  return tasks.filter(
    d => d.title.toLowerCase().startsWith(input.toLowerCase()),
  );
}

function mapStateToProps(state) {
  return {
    whiteMode: state.style.whiteMode,
    tasks: {
      daily: filterTasks(state.tasks.daily, state.filters.searchInput),
      weekly: filterTasks(state.tasks.weekly, state.filters.searchInput),
      monthly: filterTasks(state.tasks.monthly, state.filters.searchInput),
    },
    searchInput: state.filters.searchInput,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
