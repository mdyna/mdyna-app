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
    this.uniqCards = [];
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

  getUniqCards(cards) {
    this.uniqCards = [];
    this.uniqCardIds = [];
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      if (card && card.id) {
        if (this.uniqCardIds.indexOf(card.id) === -1) {
          this.uniqCardIds.push(card.id);
          this.uniqCards.push(card);
        } else {
          const repeatedCard = this.uniqCards.find(c => c.id === card.id);
          if (repeatedCard) {
            const repeatedCardIndex = this.uniqCards.indexOf(repeatedCard);
            if (
              new Date(repeatedCard.lastEditDate) < new Date(cards.lastEditDate)
            ) {
              this.uniqCards[repeatedCardIndex] = card;
            }
          }
        }
      }
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
      const uniqUserCards = (currentGist
          && currentGist.cards
          && this.getUniqCards([
            ...currentUserData.cards,
            ...currentGist.cards,
          ]))
        || currentUserData.cards;
      const uniqUserLabels = (currentGist
          && currentGist.labels
          && uniqBy(
            [...currentGist.labels, ...currentUserData.labels],
            'title',
          ))
        || currentUserData.labels;
      const uniqUserBoards = (currentGist
          && currentGist.boards && {
        boardList: {
          ...unNest(currentGist, 'boards.boardList'),
          ...unNest(currentUserData, 'boards.boardList'),
        },
      })
        || currentUserData.boards;
      uniqUserBoards.boardNames = Object.keys(uniqUserBoards.boardList).map(
        d => uniqUserBoards.boardList[d].name,
      );
      const content = {
        cards: uniqUserCards,
        boards: uniqUserBoards,
        labels: uniqUserLabels,
        lastSync: new Date(),
      };
      await this.gists.edit(this.gistId, {
        files: {
          'mdyna.json': {
            content: JSON.stringify({
              ...content,
            }),
          },
        },
      });
      return content;
    } catch (e) {
      console.log(e);
      Error.throwError('Could not sync with Gist');
    }
    return null;
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
