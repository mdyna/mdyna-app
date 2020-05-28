import React from 'react';
import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from 'Components/Cards/CardList';
import Selectors from 'Store/selectors';
import { SORTING_BY_DATE, DESCENDING_ORDER } from 'Utils/globals';

const {
  cardListSelector,
  isEditingSelector,
  titlesSelector,
  activeBoardNameSelector,
  boardLabelsSelector,
} = Selectors;

const { FILTERS, BOARDS, CARD } = ACTIONS;
const {
  changeActiveBoard, focusCard, searchCards, changeSorting, addLabelFilter, removeLabelFilter,
} = FILTERS;
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
    addCard: (activeBoard, card) => {
      dispatch(addCard(activeBoard, card));
      dispatch(searchCards(''));
      dispatch(focusCard());
    },
    changeSorting: (sorting, order) => {
      dispatch(changeSorting(sorting, order));
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}

function mapStateToProps(state) {
  const titles = titlesSelector(state);
  return {
    cards: cardListSelector(state),
    isEditing: isEditingSelector(state),
    activeBoard: activeBoardNameSelector(state),
    labels: boardLabelsSelector(state),
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
    searchHidden: state.filters.isFocused,
    titles,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(CardList));
