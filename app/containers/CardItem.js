import { connect } from 'react-redux';
import CardItem from '../components/Cards/CardItem';
import {
  generateCardLink,
  removeCard,
  toggleCard,
  editCard,
  completeCard,
  failCard,
  snoozeCard,
  addLabel,
  removeLabel,
  changeCardSetting,
  saveCard,
} from '../store/actions/';

function mapDispatchToProps(dispatch) {
  return {
    removeCard: (card) => {
      dispatch(removeCard(card));
    },
    editCard: (card) => {
      dispatch(editCard(card));
    },
    generateCardLink: (card, cardId) => {
      dispatch(generateCardLink(card, cardId));
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
    snoozeCard: (card) => {
      dispatch(snoozeCard(card));
    },
    failCard: (card) => {
      dispatch(failCard(card));
    },
    completeCard: (card) => {
      dispatch(completeCard(card));
    },

    addLabel: (todoProps) => {
      dispatch(addLabel(todoProps));
    },
    removeLabel: (todoProps) => {
      dispatch(removeLabel(todoProps));
    },
  };
}

function mapStateToProps(state) {
  return { whiteMode: state.style.whiteMode };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItem);
