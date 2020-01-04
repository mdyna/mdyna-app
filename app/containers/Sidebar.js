import { connect } from 'react-redux';
import Sidebar from 'Components/Sidebar';
import ACTIONS from 'Store/actions/';
import { SORTING_BY_DATE, DESCENDING_ORDER } from 'Utils/globals';
import { toast } from 'react-toastify';

const {
  SETTINGS, FILTERS, BOARDS, CARD,
} = ACTIONS;

const { addCard, clearArchive } = CARD;

const { toggleSidebar, toggleSettings } = SETTINGS;

const { toggleBoardsDialog } = BOARDS;

const {
  searchCards,
  addLabelFilter,
  removeLabelFilter,
  focusCard,
  changeSorting,
  toggleArchivedFilter,
} = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    clearArchive: () => {
      dispatch(clearArchive());
      toast.info('Cleared archived cards');
    },
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    onChange: (val) => {
      dispatch(searchCards(val));
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
    addCard: (activeBoard, card) => dispatch(addCard(activeBoard, card)).then(() => {
      dispatch(searchCards(''));
      dispatch(focusCard());
    }),
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}

function mapStateToProps(state) {
  return {
    activeBoard: state.filters.activeBoard,
    archivedFilterOn: state.filters.archivedFilterOn,
    labelFilters: state.filters.labelFilters,
    labels: state.labels,
    order: state.filters.order || DESCENDING_ORDER,
    sidebarExpanded: state.style.sidebarExpanded,
    sorting: state.filters.sorting || SORTING_BY_DATE,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
