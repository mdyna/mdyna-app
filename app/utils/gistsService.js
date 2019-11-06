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
    this.uniqCardIds = [];
    this.currentUserData = {};
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
        const deletedCards = this.currentUserData.deletedCards || [];
        if (
          this.uniqCardIds.indexOf(card.id) === -1
          && deletedCards.indexOf(card.id) === -1
        ) {
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
    return this.uniqCards;
  }

  async getUserGists() {
    try {
      const gistList = await this.gists.list(this.username);
      if (gistList) {
        this.gistList = gistList.body;
        return gistList.body;
      }
    } catch {
      Error.throwError(`Error getting user gists for ${this.username}`);
      return null;
    }
    return null;
  }

  async getCurrentGist() {
    if (this.gists && this.gists.get) {
      const gist = await this.gists.get(this.gistId);
      if (
        gist
        && gist.body
        && gist.body.files
        && gist.body.files['mdyna.json']
      ) {
        return JSON.parse(gist.body.files['mdyna.json'].content) || {};
      }
    }
    return '';
  }

  getDeletedCards() {
    return this.currentGist.deletedCards;
  }

  async syncGist() {
    this.currentGist = await this.getCurrentGist();
    this.currentUserData = getUserData();
    const uniqUserCards = (this.currentGist
        && this.currentGist.cards
        && this.getUniqCards([
          ...this.currentUserData.cards,
          ...this.currentGist.cards,
        ]))
      || this.currentUserData.cards;
    const uniqUserLabels = (this.currentGist
        && this.currentGist.labels
        && uniqBy(
          [...this.currentGist.labels, ...this.currentUserData.labels],
          'title',
        ))
      || this.currentUserData.labels;
    const uniqUserBoards = (this.currentGist
        && this.currentGist.boards && {
      boardList: {
        ...unNest(this.currentGist, 'boards.boardList'),
        ...unNest(this.currentUserData, 'boards.boardList'),
      },
    })
      || this.currentUserData.boards;
    uniqUserBoards.boardNames = Object.keys(uniqUserBoards.boardList).map(
      d => uniqUserBoards.boardList[d].name,
    );
    const content = {
      cards: uniqUserCards,
      boards: uniqUserBoards,
      labels: uniqUserLabels,
      lastSync: new Date(),
    };
    await this.updateGistContent(content);
    return content;
  }

  async updateDeletedCards(deletedCardId) {
    this.currentGist = await this.getCurrentGist();
    const { deletedCards = [] } = this.currentGist;
    const content = JSON.stringify({
      ...this.currentGist,
      deletedCards: [...deletedCards, deletedCardId],
    });
    await this.updateGistContent(content);
  }

  async updateGistContent(content) {
    try {
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
      if (e.message) {
        Error.throwError('Could not sync with Gist (1)');
      }
    }
    return null;
  }

  async createGist() {
    this.currentUserData = getUserData();
    try {
      const newGist = await this.gists.create({
        files: {
          'mdyna.json': {
            content: JSON.stringify({
              ...this.currentUserData,
              lastSync: new Date(),
            }),
          },
        },
        description: 'MDyna Cards',
        public: false,
      });
      if (newGist) {
        const gistList = await this.getUserGists();
        if (gistList) {
          const newGistIds = gistList.filter(
            gist => gist.description === 'MDyna Cards',
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
