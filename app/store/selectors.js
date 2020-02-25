import { createSelector } from 'reselect';
import {
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  SORTING_BY_TITLE,
} from 'Utils/globals';
import { convertToTime } from 'Utils/dates';

const activeBoardSelector = state => state.filters.activeBoard;
const boardListSelector = state => state.boards.boardList;

const activeBoardNameSelector = createSelector(
  activeBoardSelector,
  boardListSelector,
  (activeBoard, boardList) => {
    for (let i = 0; i < boardList.length; i += 1) {
      const board = boardList[i];
      if (board && board.id === activeBoard) {
        return board.name;
      }
    }
    return 'INBOX';
  },
);

function sortCards(cards, sorting, order, showArchived, activeBoard) {
  const filteredByBoard = activeBoard && activeBoard !== 'INBOX'
    ? cards.filter(card => card && card.board === activeBoard)
    : cards;
  const filteredCards = showArchived
    ? filteredByBoard.filter(card => card && card.archived)
    : filteredByBoard.filter(card => card && !card.archived);
  const sortingType = `${sorting}-${order}`;
  switch (sortingType) {
    case `${SORTING_BY_DATE}-${DESCENDING_ORDER}`:
      return filteredCards.sort(
        (a, b) => convertToTime(b[sorting]) - convertToTime(a[sorting]),
      );
    case `${SORTING_BY_DATE}-${ASCENDING_ORDER}`:
      return filteredCards.sort(
        (a, b) => convertToTime(a[sorting]) - convertToTime(b[sorting]),
      );
    case `${SORTING_BY_TITLE}-${ASCENDING_ORDER}`:
      return filteredCards.sort((a, b) => a.title.localeCompare(b.title));
    case `${SORTING_BY_TITLE}-${DESCENDING_ORDER}`:
      return filteredCards.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return filteredCards.sort(
        (a, b) => convertToTime(b[sorting]) - convertToTime(a[sorting]),
      );
  }
}

const cardsSelector = state => state.cards;
const filtersSelector = state => state.filters;
const cardListSelector = createSelector(
  cardsSelector,
  filtersSelector,
  (cards, filters) => {
    const cardList = filters.isFocused
      ? [filters.focusedCard]
      : sortCards(
        cards,
        filters.sorting || SORTING_BY_DATE,
        filters.order || DESCENDING_ORDER,
        filters.archivedFilterOn || false,
        filters.activeBoard || false,
      );
    const hideText = c => !filters.isFocused && !c.isEditing && (c.text.length > 500);
    return cardList.map(c => ({
      ...c,
      text: hideText(c) ? c.text.slice(0, 500) : c.text,
      fullText: hideText(c) ? c.text : '',
      seeMore: hideText(c),
    }));
  },
);

const boardLabelsSelector = createSelector(
  cardsSelector,
  activeBoardSelector,
  (cards, activeBoard) => {
    const labels = [];
    const boardCards = cards.filter(c => (activeBoard !== 'INBOX' ? c.board === activeBoard : true));
    for (let i = 0; i < boardCards.length; i += 1) {
      const card = boardCards[i];
      if (card.labels) {
        labels.push(...card.labels);
      }
    }
    return [...new Set(labels.map(l => l.title))].map(uniqL => ({
      title: uniqL,
    }));
  },
);

const isEditingSelector = createSelector(
  cardsSelector,
  (cards) => {
    for (let i = 0; i < cards.length; i += 1) {
      if (cards[i].isEditing) {
        return true;
      }
    }
    return false;
  },
);

const favsSelector = state => state.favs;
const favCardsSelector = createSelector(
  cardsSelector,
  favsSelector,
  (cards, favs) => cards.filter(c => favs.indexOf(c.id) !== -1),
);

const titlesSelector = createSelector(
  cardsSelector,
  cards => [...new Set(cards?.map(c => c.title))],
);

const labelsSelector = state => state.labels;
const globalLabelsSelector = createSelector(
  labelsSelector,
  labels => labels.map(l => l.title),
);

const SELECTORS = {
  cardListSelector,
  isEditingSelector,
  favCardsSelector,
  globalLabelsSelector,
  activeBoardNameSelector,
  titlesSelector,
  boardLabelsSelector,
};

export default SELECTORS;
