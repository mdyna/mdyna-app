import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import GistSync from 'Components/GistSync';
import ACTIONS from 'Store/actions/';
import Gists from 'Utils/gistsService';

const { SETTINGS } = ACTIONS;

const {
  loginToGhSuccess, loginToGhFail, loginToGh, updateGist,
} = SETTINGS;

function mapDispatchToProps(dispatch) {
  return {
    loginToGh: async (username, pw) => {
      try {
        dispatch(loginToGh(username, pw));
        Gists.loginToGh(username, pw);
        const gistList = Gists.getUserGists(username);
        if (gistList) {
          dispatch(loginToGhSuccess());
          return gistList;
        }
        return [];
      } catch (e) {
        dispatch(loginToGhFail());
        toast.error('Error logging into Github, please check your credentials');
        return [];
      }
    },
    updateGist: (id) => {
      dispatch(updateGist(id));
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
