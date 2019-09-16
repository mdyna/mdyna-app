import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import GistSync from 'Components/GistSync';
import ACTIONS from 'Store/actions/';
import Gists from 'Utils/gistsService';
import { convertDateToLocaleString } from 'Utils/dates';

const { SETTINGS } = ACTIONS;

const {
  loginToGhSuccess,
  loginToGhFail,
  loginToGh,
  updateGist,
  syncCardsSuccess,
  syncCardsFail,
  syncCards,
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
      Gists.updateGistId(id);
      dispatch(updateGist(id));
    },
    syncCards: async () => {
      try {
        dispatch(syncCards());
        const content = await Gists.syncGist();
        if (content) {
          toast.success('Synced with GitHub Gist');
          dispatch(syncCardsSuccess());
        }
      } catch {
        dispatch(syncCardsFail());
        toast.error('Could not sync with GitHub Gist');
      }
    },
  };
}

function mapStateToProps(state) {
  return {
    githubUserName: state.settings.githubUserName || '',
    githubPassword: state.settings.githubPassword || '',
    gistId: state.settings.gistId || '',
    lastSyncDate:
      convertDateToLocaleString(state.settings.lastSyncDate) || null,
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
