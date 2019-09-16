import Gists from 'gists';
import Error from 'UI/Error';
import { getUserData } from 'Store';

class GistsService {
  constructor() {
    this.username = '';
    this.pw = '';
    this.gists = [];
    this.gistList = [];
    this.gistId = '';
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
