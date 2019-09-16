import Gists from 'gists';
import Error from 'UI/Error';
import unNest from 'Utils/nest';
import uniqBy from 'lodash/uniqBy';
import { getUserData } from 'Store';

class GistsService {
  constructor() {
    this.username = '';
    this.pw = '';
    this.gists = [];
    this.gistList = [];
    this.gistId = '';
  }

  updateGistId(id) {
    this.gistId = id;
    this.syncGist();
  }

  loginToGh(username, pw) {
    try {
      this.username = username;
      this.pw = pw;
      this.gists = new Gists({
        username,
        password: pw,
      });
    } catch {
      Error.throwError('Could not login to GitHub. Check your credentials.');
    }
  }

  async getUserGists() {
    try {
      const gistList = await this.gists.list(this.username);
      if (gistList) {
        this.gistList = gistList.body;
        return gistList.body;
      }
      return [];
    } catch {
      Error.throwError(`Error getting user gists for ${this.username}`);
    }
    return [];
  }

  async getCurrentGist() {
    const gist = await this.gists.get(this.gistId);
    if (gist && gist.body && gist.body.files && gist.body.files['mdyna.json']) {
      return JSON.parse(gist.body.files['mdyna.json'].content) || {};
    }
    return '';
  }

  async syncGist() {
    try {
      const currentGist = await this.getCurrentGist();
      const currentUserData = getUserData();
      const uniqUserCards = uniqBy(
        [...currentGist.cards, ...currentUserData.cards],
        'id',
      );
      const uniqUserLabels = uniqBy(
        [...currentGist.labels, ...currentUserData.labels],
        'title',
      );
      const uniqUserBoards = {
        boardList: {
          ...unNest(currentGist, 'boards.boardList'),
          ...unNest(currentUserData, 'boards.boardList'),
        },
        boardNames: new Set([
          ...unNest(currentUserData, 'boards.boardNames'),
          ...unNest(currentGist, 'boards.boardNames'),
        ]),
      };
      const content = {
        cards: uniqUserCards,
        boards: uniqUserBoards,
        labels: uniqUserLabels,
        lastSync: new Date(),
      };
      await this.gists.edit(this.gistId, {
        files: {
          'mdyna.json': JSON.stringify({
            content,
          }),
        },
      });
    } catch {
      Error.throwError('Could not sync with Gist');
    }
  }

  async createGist() {
    try {
      const newGist = await this.gists.create({
        files: {
          'mdyna.json': {
            content: JSON.stringify({ ...getUserData(), lastSync: new Date() }),
          },
        },
        description: 'Mdyna Cards',
        public: false,
      });
      if (newGist) {
        const gistList = await this.getUserGists();
        if (gistList) {
          const newGistIds = gistList.filter(
            gist => gist.description === 'Mdyna Cards',
          );
          return newGistIds && newGistIds[0].id;
        }
      }
    } catch (e) {
      Error.throwError('Could not create gist');
    }
    return '';
  }
}
export default new GistsService();
