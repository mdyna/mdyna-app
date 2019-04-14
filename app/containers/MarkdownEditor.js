import { connect } from 'react-redux';
import { changeCardSetting } from 'Store/actions';
import MarkdownEditor from 'UI/MarkdownEditor';

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
