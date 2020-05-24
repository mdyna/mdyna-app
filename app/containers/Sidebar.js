import React from 'react';
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
    addCard: (activeBoard, card) => {
      dispatch(addCard(activeBoard, card));
      dispatch(searchCards(''));
      dispatch(focusCard());
    },
  };
}

function mapStateToProps(state) {
  return {
    activeBoard: state.filters.activeBoard,
    archivedFilterOn: state.filters.archivedFilterOn,
    order: state.filters.order || DESCENDING_ORDER,
    githubAuthOn: state.settings.githubAuthOn || false,
    sidebarExpanded: state.style.sidebarExpanded,
    sorting: state.filters.sorting || SORTING_BY_DATE,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Sidebar));
