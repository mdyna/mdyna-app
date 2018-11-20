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

const saveId = (card, cardList) => card.id || addId(cardList);

const cardTitle = action => unNest(action, 'card.title') || 'Untitled Note';
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
        if (action.card.id) {
          if (card.id === action.card.id) {
            return action.card;
          }
        }
        return { ...card, id: saveId(action.card, state) };
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
          return {
            ...card,
            taskStats: {
              ...card.taskStats,
              failed: card.taskStats.failed + 1 || 1,
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
          return {
            ...card,
            taskStats: {
              ...card.taskStats,
              snooze: card.taskStats.snooze + 1 || 1,
              lastAlertDate: new Date(),
            },
          };
        }
        return card;
      });

    case COMPLETE_CARD:
      return state.map((card) => {
        if (card.id !== action.card.id) {
          return {
            ...card,
            taskStats: {
              ...card.taskStats,
              completed: card.taskStats.completed + 1 || 1,
              consecutive: card.taskStats.consecutive + 1 || 1,
              record:
                card.taskStats.record > card.taskStats.consecutive + 1
                  ? card.taskStats.record
                  : card.taskStats.consecutive + 1 || 1,
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
