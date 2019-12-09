import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import Gists from 'Utils/gistsService';
import CardItem from '../components/Cards/CardItem';

const {
  CARD, LABEL, FILTERS, SETTINGS, BOARDS, FAV,
} = ACTIONS;

const { addLabel, removeLabel } = LABEL;

const { addFav, removeFav } = FAV;

const { focusCard, addLabelFilter, removeLabelFilter } = FILTERS;

const { toggleBoardsDialog, createBoard } = BOARDS;

const {
  removeCard,
  toggleCard,
  saveCard,
  editCard,
  changeCardSetting,
  discardCardChanges,
  addCard,
} = CARD;

const { updateDeletedCards } = SETTINGS;

function mapDispatchToProps(dispatch) {
  return {
    duplicateCard: (card) => {
      dispatch(addCard(card.board, card));
    },
    addFav: (card) => {
      dispatch(addFav(card));
    },
    removeFav: (card) => {
      dispatch(removeFav(card));
    },
    removeCard: async (card) => {
      dispatch(removeCard(card));
      dispatch(updateDeletedCards(card.id));
      await Gists.updateDeletedCards(card.id);
    },
    changeCardSetting: (prop, value, cardId, isFocused, card) => {
      dispatch(changeCardSetting(prop, value, cardId));
      if (isFocused) {
        const editedCard = { ...card };
        editedCard[prop] = value;
        dispatch(focusCard(editedCard));
      }
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    discardCardChanges: (card, isFocused) => {
      dispatch(discardCardChanges(card));
      if (isFocused) {
        dispatch(
          focusCard({
            ...card,
            isEditing: false,
            editingText: '',
            editingColor: '',
            editingLabels: '',
            editingTitle: '',
          }),
        );
      }
    },
    editCard: (card, isFocused) => {
      dispatch(editCard(card));
      if (isFocused && !card.isEditing) {
        dispatch(
          focusCard({
            ...card,
            isEditing: !card.isEditing,
            editingText: card.text,
            editingLabels: card.labels,
            editingColor: card.color,
            editingTitle: card.title,
          }),
        );
      }
    },
    toggleCard: (card) => {
      dispatch(toggleCard(card));
    },
    saveCard: (card, isFocused) => new Promise((resolve) => {
      dispatch(saveCard(card));
      if (isFocused) {
        dispatch(
          focusCard({
            ...card,
            isEditing: false,
            text: card.editingText || card.text,
            color: card.editingColor || card.color,
            labels: card.editingLabels || card.labels,
            title: card.editingTitle || card.title,
          }),
        );
      }
      resolve();
    }),
    addLabel: (val) => {
      dispatch(addLabel(val));
    },
    removeLabel: (val) => {
      dispatch(removeLabel(val));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
    focusCard: (card) => {
      dispatch(focusCard(card));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
  };
}

function mapStateToProps(state) {
  return {
    favs: state.favs.map(f => f.title),
    isFocused: state.filters.isFocused,
    whiteMode: state.style.whiteMode,
    boardNames: state.boards.boardNames,
    boards: state.boards.boardList,
    labelFilters: state.filters.labelFilters,
    globalLabels: state.labels.map(l => l.title),
    codeTheme: state.settings.codeTheme,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardItem);
