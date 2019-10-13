import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import Gists from 'Utils/gistsService';
import CardItem from '../components/Cards/CardItem';

const {
  CARD_EDITOR, CARD, LABEL, FILTERS, SETTINGS,
} = ACTIONS;

const { editCard, toggleEditor } = CARD_EDITOR;

const { addLabel, removeLabel } = LABEL;

const { focusCard, addLabelFilter, removeLabelFilter } = FILTERS;

const {
  removeCard, toggleCard, addCard, saveCard,
} = CARD;

const { updateDeletedCards } = SETTINGS;

function mapDispatchToProps(dispatch) {
  return {
    removeCard: async (card) => {
      dispatch(removeCard(card));
      dispatch(updateDeletedCards(card.id));
      await Gists.updateDeletedCards(card.id);
    },
    editCard: (card) => {
      dispatch(editCard(card));
    },
    toggleCard: (card) => {
      dispatch(toggleCard(card));
    },
    saveCard: (card, isFocused, newCard, editorSettings) => {
      dispatch(toggleEditor());
      if (newCard) {
        dispatch(addCard(editorSettings));
      } else {
        dispatch(saveCard(card));
      }
      if (isFocused) {
        dispatch(focusCard(card));
      }
    },
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
  };
}

function mapStateToProps(state) {
  return {
    isFocused: state.filters.isFocused,
    whiteMode: state.style.whiteMode,
    labelFilters: state.filters.labelFilters,
    codeTheme: state.settings.codeTheme,
    newCard: state.editor.newCard,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardItem);
