import unNest from 'Utils/nest';
import ACTION_TYPES from '../actions/actionTypes';

const cwd = window.cwd || '';

const {
  CHANGE_CWD,
  TOGGLE_SETTINGS,
  CHANGE_CPP,
  CHANGE_CODE_THEME,
  LOGIN_TO_GH,
  LOGIN_TO_GH_SUCCESS,
  LOGIN_TO_GH_FAIL,
  SYNC_CARDS,
  SYNC_CARDS_SUCCESS,
  SYNC_CARDS_FAIL,
  UPDATE_GIST,
} = ACTION_TYPES.SETTINGS;

function settingsReducer(
  state = {
    cwd,
    settingsModal: false,
    codeTheme: 'Default',
    cardsPerPage: 8,
    githubUserName: '',
    githubPassword: '',
    gistId: '',
    lastSyncDate: '',
    githubAuthOn: false,
    loadingGitHub: false,
    syncing: false,
    syncSuccess: false,
  },
  action,
) {
  switch (action.type) {
    case CHANGE_CWD:
      return {
        ...state,
        cwd: action.cwd,
      };
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settingsModal: !state.settingsModal,
      };
    case CHANGE_CPP:
      return {
        ...state,
        cardsPerPage: action.payload,
      };
    case CHANGE_CODE_THEME:
      return {
        ...state,
        codeTheme: action.payload || 'Default',
      };
    case LOGIN_TO_GH_SUCCESS:
      return {
        ...state,
        githubAuthOn: true,
        loadingGitHub: false,
      };
    case LOGIN_TO_GH_FAIL:
      return {
        ...state,
        githubAuthOn: false,
        githubUserName: '',
        githubPassword: '',
        loadingGitHub: false,
      };
    case LOGIN_TO_GH:
      return {
        ...state,
        githubUserName: unNest(action, 'payload.username'),
        githubPassword: unNest(action, 'payload.password'),
        loadingGitHub: true,
      };
    case UPDATE_GIST:
      return {
        ...state,
        gistId: unNest(action, 'payload.gistId'),
      };
    case SYNC_CARDS_SUCCESS:
      return {
        ...state,
        lastSyncDate: new Date(),
        syncSuccess: true,
        syncing: false,
      };
    case SYNC_CARDS_FAIL:
      return {
        ...state,
        lastSyncDate: new Date(),
        syncSuccess: false,
        syncing: false,
      };
    case SYNC_CARDS:
      return {
        ...state,
        syncing: true,
      };
    default:
      return state;
  }
}

export default settingsReducer;
