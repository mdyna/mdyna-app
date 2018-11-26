import ACTION_TYPES from '../actions/actionTypes';
import unNest from '../../utils/nest';

const {
  ADD_CARD,
  REMOVE_CARD,
  TOGGLE_CARD,
  GENERATE_LINK,
  SAVE_CARD,
  FAIL_CARD,
  SNOOZE_CARD,
  COMPLETE_CARD,
} = ACTION_TYPES.CARD;

const addId = cardList =>
  (cardList &&
    cardList[cardList.length - 1] &&
    cardList[cardList.length - 1].id &&
    cardList[cardList.length - 1].id + 1) ||
  (cardList && cardList.length) ||
  1;

// const saveId = (card, cardList) => card.id || addId(cardList);

const cardTitle = action => unNest(action, 'card.title') || 'Untitled Note';
const getCardStats = card =>
  (card && card.cardStats) || {
    snooze: 0,
    failed: 0,
    consecutive: 0,
    record: 0,
    completed: 0,
  };
export default function cards(state = [], action) {
  switch (action.type) {
    case ADD_CARD:
      return [
        ...state,
        {
          ...action.card,
          title: cardTitle(action),
          id: addId(state),
          completed: false,
        },
      ];
    case REMOVE_CARD:
      return state.filter(card => card.id !== action.card.id);
    case SAVE_CARD:
      return state.map((card) => {
        if (card.id === action.card.id) {
          return action.card;
        }
        return card;
      });
    case TOGGLE_CARD:
      return state.map((card) => {
        if (card.id === action.card.id) {
          return {
            ...card,
            completed: !card.completed,
          };
        }
        return card;
      });
    case GENERATE_LINK:
      return state.map((card) => {
        if (card.id === action.index) {
          return {
            ...card,
            id: action.keys.id,
            shortLink: action.keys.shortLink,
          };
        }
        return card;
      });

    case FAIL_CARD:
      return state.map((card) => {
        if (card.id === action.card.id) {
          const cardStats = getCardStats(card);
          return {
            ...card,
            cardStats: {
              ...cardStats,
              failed: cardStats.failed + 1 || 1,
              consecutive: 0,
              lastAlertDate: new Date(),
            },
          };
        }
        return card;
      });

    case SNOOZE_CARD:
      return state.map((card) => {
        if (card.id === action.card.id) {
          const cardStats = getCardStats(card);
          return {
            ...card,
            cardStats: {
              ...cardStats,
              snooze: cardStats.snooze + 1 || 1,
              lastAlertDate: new Date(),
            },
          };
        }
        return card;
      });

    case COMPLETE_CARD:
      return state.map((card) => {
        if (card.id === action.card.id) {
          const cardStats = getCardStats(card);
          return {
            ...card,
            cardStats: {
              ...cardStats,
              completed: cardStats.completed + 1 || 1,
              consecutive: cardStats.consecutive + 1 || 1,
              record:
                cardStats.record > cardStats.consecutive + 1
                  ? cardStats.record
                  : cardStats.consecutive + 1 || 1,
              lastCompletedDate: new Date(),
              lastAlertDate: new Date(),
            },
          };
        }
        return card;
      });
    default:
      return state;
  }
}
