import { connect } from 'react-redux';
import App from 'Components/App';
import ACTIONS from 'Store/actions/';
import { convertToTime } from 'Utils/dates';
import {
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  SORTING_BY_TITLE,
} from 'Utils/globals';

const {
  SETTINGS, FILTERS, BOARDS, CARD_EDITOR,
} = ACTIONS;

const { toggleSidebar, toggleSettings } = SETTINGS;

const {
  toggleBoardsDialog,
  createBoard,
  deleteBoard,
  changeBoardName,
} = BOARDS;

const { toggleEditor } = CARD_EDITOR;

const {
  searchCards,
  addLabelFilter,
  removeLabelFilter,
  focusCard,
  changeActiveBoard,
  changeSorting,
  toggleArchivedFilter,
} = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    changeActiveBoard: (board) => {
      dispatch(changeActiveBoard(board));
    },
    createBoard: (board) => {
      dispatch(createBoard(board));
    },
    deleteBoard: (board) => {
      dispatch(deleteBoard(board));
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    focusCard: () => {
      dispatch(focusCard(false));
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
    changeBoardName: (board, newName) => {
      dispatch(changeBoardName(board, newName));
    },
    changeSorting: (sorting, order) => {
      dispatch(changeSorting(sorting, order));
    },
    toggleArchivedFilter: (val) => {
      dispatch(toggleArchivedFilter(val));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}

function sortCards(cards, sorting, order, showArchived, activeBoard) {
  const filteredByBoard = activeBoard && activeBoard !== 'INBOX'
    ? cards.filter(card => card && card.board === activeBoard)
    : cards;
  const filteredCards = showArchived
    ? filteredByBoard.filter(card => card && (card.archived || card.completed))
    : filteredByBoard.filter(card => card && !card.archived && !card.completed);
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
  const cards = state.filters.isFocused
    ? [state.filters.focusedCard]
    : sortCards(
      state.cards,
      (state.filters && state.filters.sorting) || SORTING_BY_DATE,
      (state.filters && state.filters.order) || DESCENDING_ORDER,
      (state.filters && state.filters.archivedFilterOn) || false,
      (state.filters && state.filters.activeBoard) || false,
    );

  return {
    searchInput: state.filters.searchInput,
    activeBoard: state.filters.activeBoard,
    isFocused: state.filters.isFocused,
    labelFilters: state.filters.labelFilters,
    archivedFilterOn: state.filters.archivedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    modalOpen: state.editor.toggleEditor,
    boards: state.boards.boardList,
    boardsDialogOpen: state.boards.boardsDialogOpen,
    settingsModal: state.settings.settingsModal,
    sorting: state.filters.sorting || SORTING_BY_DATE,
    order: state.filters.order || DESCENDING_ORDER,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards: cards || [],
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
