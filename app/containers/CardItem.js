import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardItem from '../components/Cards/CardItem';

const {
  CARD_EDITOR, CARD, LABEL, FILTERS,
} = ACTIONS;

const { editCard, changeCardSetting } = CARD_EDITOR;

const { addLabel, removeLabel } = LABEL;

const { focusCard, addLabelFilter, removeLabelFilter } = FILTERS;

const {
  removeCard, toggleCard, saveCard, changeTitle,
} = CARD;

function mapDispatchToProps(dispatch) {
  return {
    removeCard: (card) => {
      dispatch(removeCard(card));
    },
    editCard: (card) => {
      dispatch(editCard(card));
    },
    toggleCard: (card) => {
      dispatch(toggleCard(card));
    },
    changeCardSetting: (prop, value) => {
      dispatch(changeCardSetting(prop, value));
    },
    saveCard: (card) => {
      dispatch(saveCard(card));
    },
    changeTitle: (card, title) => {
      dispatch(changeTitle(card, title));
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardItem);
