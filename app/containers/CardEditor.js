import { connect } from 'react-redux';
import CardEditor from 'Components/CardEditor';
import ACTIONS from 'Store/actions/';

const {
  CARD, CARD_EDITOR, LABEL, BOARDS, FILTERS,
} = ACTIONS;

const { addCard, saveCard } = CARD;

const { focusCard } = FILTERS;

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
    focusCard: (card) => {
      dispatch(focusCard(card));
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
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
    focusedCard: Boolean(state.filters.focusedCard),
    boardNames: state.boards.boardNames || ['INBOX'],
    boards: state.boards.boardList || [
      {
        name: 'INBOX',
        cards: 'all',
        bg: 'default',
        labels: 'all',
      },
    ],
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardEditor);
