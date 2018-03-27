import { connect } from 'react-redux';
import MarkdownEditor from '../components/Tasks/MarkdownEditor';
import { changeTaskSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return { changeTaskSetting: (prop, value) => {
    dispatch(changeTaskSetting(prop, value));
  } };
}
function mapStateToProps(state) {
  return {
    text: state.editor.text,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MarkdownEditor);
