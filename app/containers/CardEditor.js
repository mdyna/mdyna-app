import { connect } from 'react-redux';
import CardEditor from 'Components/CardEditor';
import {
  changeCardSetting,
  saveCard,
  addCard,
  removeCard,
  addLabel,
  removeLabel,
  toggleEditor,
} from 'Store/actions/';

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
    whiteMode: state.style.whiteMode,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CardEditor);
