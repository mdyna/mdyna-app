import { connect } from 'react-redux';
import cardPreview from '../components/Cards/CardPreview';
import { saveCard } from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeCard: (card) => {
      dispatch(saveCard(card));
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
