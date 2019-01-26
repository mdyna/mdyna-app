import { connect } from 'react-redux';
import cardPreview from '../components/Cards/CardPreview';
import { changeCardSetting } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    saveCard: (card) => {
      dispatch(changeCardSetting('text', card.text));
    },
  };
}
function mapStateToProps(state) {
  return {
    card: state.editor,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(cardPreview);
