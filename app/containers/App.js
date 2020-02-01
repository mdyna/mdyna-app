import { connect } from 'react-redux';
import App from 'Components/App';
import ACTIONS from 'Store/actions/';

const { SETTINGS, FILTERS, BOARDS } = ACTIONS;

const { toggleSettings } = SETTINGS;

const { toggleBoardsDialog } = BOARDS;

const { focusCard } = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleBoardsDialog: () => {
      dispatch(toggleBoardsDialog());
    },
    focusCard: () => {
      dispatch(focusCard(false));
    },
  };
}

function mapStateToProps(state) {
  return {
    boardsDialogOpen: state.boards.boardsDialogOpen || false,
    settingsModal: state.settings.settingsModal || false,
    whiteMode: state.style.whiteMode,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
