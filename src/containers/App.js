import { connect } from 'react-redux';
import App from '../components/App';
import { toggleWhiteMode, toggleEditor } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
  };
}
function mapStateToProps(state) {
  return {
    whiteMode: state.style.whiteMode,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
