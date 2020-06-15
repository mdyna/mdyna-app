import ACTIONS from 'Store/actions/';
import React from 'react';
import Sidebar from 'Components/Sidebar';
import { connect } from 'react-redux';
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
    githubAuthOn: state.settings.githubAuthOn || false,
    sidebarExpanded: state.style.sidebarExpanded,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Sidebar));
