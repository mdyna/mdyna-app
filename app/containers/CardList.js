import { connect } from 'react-redux';
import ACTIONS from 'Store/actions';
import CardList from 'Components/Cards/CardList';
import { getRandomColor } from 'Utils/colors';

const { FILTERS, BOARDS, CARD } = ACTIONS;
const { changeActiveBoard } = FILTERS;
const { addCard } = CARD;
const { toggleBoardsDialog, createBoard } = BOARDS;

const NEW_CARD_TEMPLATE = {
  title: 'New card',
  text: `
  ## Shortcuts
  - ESC to discard changes
  - Ctrl+Enter to save changes
`,
  editingText: '## Double click to edit card',
};
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
    addCard: (activeBoard) => {
      dispatch(
        addCard({
          title: NEW_CARD_TEMPLATE.title,
          text: NEW_CARD_TEMPLATE.text,
          board: activeBoard,
          color: getRandomColor(),
          isEditing: true,
          editingTitle: NEW_CARD_TEMPLATE.title,
          editingText: NEW_CARD_TEMPLATE.editingText,
        }),
      );
    },
  };
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
  return {
    searchInput: state.filters.searchInput,
    archivedFilterOn: state.filters.archivedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    labelFilters: state.filters.labelFilters,
    boardNames: state.boards.boardNames,
    boards: state.boards.boardList,
    activeBoard: activeBoardName,
    activeBoardId: state.filters.activeBoard,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardList);
