import { connect } from 'react-redux';
import GistSync from 'Components/GistSync';
import ACTIONS from 'Store/actions/';

const { SETTINGS } = ACTIONS;

const { loginToGhSuccess, loginToGhFail, loginToGh } = SETTINGS;

function mapDispatchToProps(dispatch) {
  return {
    loginToGh: (username, pw) => {
      dispatch(loginToGh(username, pw));
    },
    loginToGhFail: () => {
      dispatch(loginToGhFail());
    },
    loginToGhSuccess: () => {
      dispatch(loginToGhSuccess());
    },
  };
}

function mapStateToProps(state) {
  return {
    githubUserName: state.settings.githubUserName || '',
    githubPassword: state.settings.githubPassword || '',
    gistId: state.settings.gistId || '',
    lastSyncDate: state.settings.lastSyncDate || '',
    githubAuthOn: state.settings.githubAuthOn || false,
    loadingGitHub: state.settings.loadingGitHub || false,
    syncing: state.settings.syncing || false,
    syncSuccess: state.settings.syncSuccess || false,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GistSync);
