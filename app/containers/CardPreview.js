import { connect } from 'react-redux';
import cardPreview from 'Components/Cards/CardPreview';
import { changeCardSetting, changeTitle } from 'Store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    saveCard: (card) => {
      dispatch(changeCardSetting('text', card.text));
    },
    changeTitle: (card, title) => {
      dispatch(changeTitle(card, title));
    },
  };
}
function mapStateToProps(state) {
  return {
    card: state.editor,
    codeTheme: state.settings.codeTheme,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(cardPreview);
