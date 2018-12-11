import React, { Component } from 'react';
import Share from 'grommet/components/icons/base/Share';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NOTE_ENDPOINT = `${window.serverHost}/note/`;
const ADD_NOTE_ENDPOINT = `${window.serverHost}/addNote/`;

class CardShareButton extends Component {
  generateCardLink() {
    const { card, generateCardLinkFunc } = this.props;
    if (!card.shortLink) {
      fetch(ADD_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      })
        .then(data => data.json())
        .then((res) => {
          const responseKeys = {
            noteId: res.note_id,
            shortLink: res.short_link,
          };
          generateCardLinkFunc(responseKeys, card.noteId);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { card } = this.props;
    return card.shortLink ? (
      <a href={`${NOTE_ENDPOINT}${card.shortLink}`} rel="noopener noreferrer" target="_blank">
        <div className={classnames('share-box', { sharing: card.shortLink })}>
          <Button onClick={() => this.generateCardLink()}>
            <Share className="share-icon" />
          </Button>
          <span>{card.shortLink}</span>
        </div>
      </a>
    ) : (
      <div className={classnames('share-box', { sharing: card.shortLink })}>
        <Button onClick={() => this.generateCardLink()}>
          <Share className="share-icon" />
        </Button>
        <span>{card.shortLink}</span>
      </div>
    );
  }
}

export default CardShareButton;

CardShareButton.propTypes = {
  card: PropTypes.object.isRequired,
  generateCardLinkFunc: PropTypes.func.isRequired,
};
