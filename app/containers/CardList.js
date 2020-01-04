import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from 'Components/Cards/CardList';
import {
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  SORTING_BY_TITLE,
} from 'Utils/globals';
import { convertToTime } from 'Utils/dates';

const { FILTERS, BOARDS, CARD } = ACTIONS;
const { changeActiveBoard, focusCard, searchCards } = FILTERS;
const { addCard, importCards } = CARD;
const { toggleBoardsDialog, createBoard } = BOARDS;

function mapDispatchToProps(dispatch) {
  return {
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
    importCards: (cards) => {
      dispatch(importCards(cards));
    },
    focusCard: (card) => {
      dispatch(focusCard(card));
    },
    addCard: (activeBoard, card) => dispatch(addCard(activeBoard, card)).then(() => {
      dispatch(searchCards(''));
      dispatch(focusCard());
    }),
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
  };
}

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

function mapStateToProps(state) {
  const activeBoard = (state.filters && state.filters.activeBoard) || 'INBOX';
  let activeBoardName = 'INBOX';
  for (let i = 0; i < state.boards.boardList.length; i += 1) {
    const board = state.boards.boardList[i];
    if (board && board.id === activeBoard) {
      activeBoardName = board.name;
    }
  }

  const cards = state.filters.isFocused
    ? [state.filters.focusedCard]
    : sortCards(
      state.cards,
      (state.filters && state.filters.sorting) || SORTING_BY_DATE,
      (state.filters && state.filters.order) || DESCENDING_ORDER,
      (state.filters && state.filters.archivedFilterOn) || false,
      (state.filters && state.filters.activeBoard) || false,
    );
  const isEditing = Boolean(cards.filter(c => c.isEditing).length);

  return {
    cards,
    isEditing,
    activeBoard: activeBoardName,
    activeBoardId: state.filters.activeBoard,
    archivedFilterOn: state.filters.archivedFilterOn,
    boardNames: state.boards.boardNames,
    isFocused: state.filters.isFocused || false,
    boards: state.boards.boardList,
    cardsPerPage: state.settings.cardsPerPage,
    order: state.filters.order || DESCENDING_ORDER,
    sorting: state.filters.sorting || SORTING_BY_DATE,
    labelFilters: state.filters.labelFilters,
    searchInput: state.filters.searchInput,
    sidebarExpanded: state.style.sidebarExpanded,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
