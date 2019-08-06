import { connect } from 'react-redux';
import Settings from 'Components/Settings';
import ACTIONS from 'Store/actions/';

const {
  toggleWhiteMode,
  changeCwd,
  toggleSettings,
  changeCodeTheme,
  changeCardsPerPage,
} = ACTIONS.SETTINGS;

function mapDispatchToProps(dispatch) {
  return {
    changeCwd: (cwd) => {
      dispatch(changeCwd(cwd));
    },
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    changeCardsPerPage: (val) => {
      dispatch(changeCardsPerPage(val));
    },
    changeCodeTheme: (val) => {
      dispatch(changeCodeTheme(val));
    },
  };
}

function mapStateToProps(state) {
  return {
    cwd: state.settings.cwd,
    codeTheme: state.settings.codeTheme,
    settingsModal: state.settings.settingsModal,
    whiteMode: state.style.whiteMode,
    cardsPerPage: state.settings.cardsPerPage,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
