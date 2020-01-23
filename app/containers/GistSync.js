import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import GistSync from 'Components/GistSync';
import ACTIONS from 'Store/actions/';
import Gists from 'Utils/gistsService';
import { convertDateToLocaleString } from 'Utils/dates';

const {
  SETTINGS, CARD, BOARDS, LABEL,
} = ACTIONS;

const {
  loginToGhSuccess,
  loginToGhFail,
  loginToGh,
  updateGist,
  syncCardsSuccess,
  syncCardsFail,
  syncCards,
  desyncGh,
} = SETTINGS;

const { updateCardList } = CARD;
const { updateBoardList } = BOARDS;
const { updateLabelList } = LABEL;
const syncCardsProp = async (dispatch) => {
  try {
    dispatch(syncCards());
    const content = await Gists.syncGist();
    if (content) {
      toast.success('Connected to Gist');
      dispatch(syncCardsSuccess());
      dispatch(updateCardList(content.cards));
      dispatch(updateLabelList(content.labels));
      dispatch(updateBoardList(content.boards));
    }
  } catch (e) {
    dispatch(syncCardsFail());
    console.error(e);
    toast.error('Could not sync with GitHub Gist (3)');
  }
};

function mapDispatchToProps(dispatch, ownProps) {
  const { githubAuthOn, lastSyncDate } = ownProps;
  // TODO Move this to utils #DRY
  const hasSyncedRecently = syncTimer => Boolean(
    lastSyncDate
        && new Date().getMinutes() - new Date(lastSyncDate).getMinutes()
          <= syncTimer,
  );
  return {
    loginToGh: async (username, pw, gistId) => {
      if (!githubAuthOn) {
        try {
          dispatch(loginToGh(username, pw));
          Gists.loginToGh(username, pw, gistId);
          const gistList = await Gists.getUserGists(username);
          if (gistList && gistList.length) {
            dispatch(loginToGhSuccess());
            return gistList;
          }
          toast.error('Error logging into Github, please check your credentials');
          dispatch(loginToGhFail());
        } catch {
          dispatch(loginToGhFail());
          toast.error('Error logging into Github, please check your credentials');
        }
      }
      return null;
    },
    desyncGh: () => {
      dispatch(desyncGh());
    },
    syncCards: () => !hasSyncedRecently(1) && syncCardsProp(dispatch) || toast.warn('Cards were synced recently'),
    updateGist: (id) => {
      if (!hasSyncedRecently(1)) {
        Gists.updateGistId(id);
        syncCardsProp(dispatch);
        dispatch(updateGist(id));
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
