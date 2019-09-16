import Gists from 'gists';
import Error from 'UI/Error';

class GistsService {
  constructor() {
    this.username = '';
    this.pw = '';
    this.gists = [];
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
        return gistList.body;
      }
      return [];
    } catch {
      Error.throwError(`Error getting user gists for ${this.username}`);
    }
    return [];
  }
}
export default new GistsService();
