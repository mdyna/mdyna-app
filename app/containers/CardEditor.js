import { connect } from 'react-redux';
import CardEditor from 'Components/CardEditor';
import ACTIONS from 'Store/actions/';

const { CARD, CARD_EDITOR, LABEL } = ACTIONS;

const { addCard, saveCard, removeCard } = CARD;

const { changeCardSetting, toggleEditor } = CARD_EDITOR;

const { addLabel, removeLabel } = LABEL;

function mapDispatchToProps(dispatch) {
  return {
    changeCardSetting: (prop, value) => {
      dispatch(changeCardSetting(prop, value));
    },
    saveCard: (card) => {
      dispatch(saveCard(card));
    },
    addCard: (card) => {
      dispatch(addCard(card));
    },
    removeCard: (card) => {
      dispatch(removeCard(card));
    },
    addLabel: (card) => {
      dispatch(addLabel(card));
    },
    removeLabel: (card) => {
      dispatch(removeLabel(card));
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
  };
}
function mapStateToProps(state) {
  return {
    editorSettings: state.editor,
    labels: state.labels,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardEditor);
