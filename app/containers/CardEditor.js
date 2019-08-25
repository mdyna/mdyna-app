import { connect } from 'react-redux';
import CardEditor from 'Components/CardEditor';
import ACTIONS from 'Store/actions/';

const {
  CARD, CARD_EDITOR, LABEL, BOARDS,
} = ACTIONS;

const { addCard, saveCard, removeCard } = CARD;

const { changeCardSetting, toggleEditor } = CARD_EDITOR;

const { addLabel, removeLabel } = LABEL;
const { createBoard, toggleBoardsDialog } = BOARDS;

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
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    removeCard: (card) => {
      dispatch(removeCard(card));
    },
    addLabel: (card) => {
      dispatch(addLabel(card));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
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
    boards: state.boards.boards,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardEditor);
