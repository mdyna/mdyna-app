import { connect } from 'react-redux';
import Settings from 'Components/Settings';
import { toggleWhiteMode, changeCwd, toggleSettings } from 'Store/actions/';

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
  };
}

function mapStateToProps(state) {
  return {
    cwd: state.settings.cwd,
    settingsModal: state.settings.settingsModal,
    whiteMode: state.style.whiteMode,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
