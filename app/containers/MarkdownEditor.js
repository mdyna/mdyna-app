import { connect } from 'react-redux';
import MarkdownEditor from '../components/MarkdownEditor';
import { changeCardSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    changeNoteSetting: (prop, value) => {
      dispatch(changeCardSetting(prop, value));
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
