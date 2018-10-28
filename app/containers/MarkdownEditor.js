import { connect } from 'react-redux';
import MarkdownEditor from '../components/MarkdownEditor';
import { changeNoteSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    changeNoteSetting: (prop, value) => {
      dispatch(changeNoteSetting(prop, value));
    },
  };
}
function mapStateToProps(state) {
  return {
    text: state.editor.text,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarkdownEditor);
