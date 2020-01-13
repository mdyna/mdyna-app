import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from 'Components/Cards/CardList';
import Selectors from 'Store/selectors';
import { SORTING_BY_DATE, DESCENDING_ORDER } from 'Utils/globals';

const {
  cardListSelector,
  isEditingSelector,
  activeBoardNameSelector,
} = Selectors;

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

function mapStateToProps(state) {
  const cards = cardListSelector(state);
  const isEditing = isEditingSelector(state);
  const activeBoard = activeBoardNameSelector(state);

  return {
    cards,
    isEditing,
    activeBoard,
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
