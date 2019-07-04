import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Checkmark, Trash, Edit, FormUp, FormDown,
} from 'grommet-icons';
import Button from 'UI/Button';
import classnames from 'classnames';
import assertCardChanges from '../../utils/assertChanges';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';

import './CardBar.scss'; // eslint-disable-line

const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;

class CardBar extends Component {
  shouldComponentUpdate(nextProps) {
    const { card } = this.props;
    if (nextProps.card && card) {
      return assertCardChanges(nextProps.card, card);
    }
    return false;
  }

  handleLabels(removeLabelFunc) {
    const { card } = this.props;
    const { labels } = card;
    if (labels && labels.length) {
      labels.forEach((label) => {
        removeLabelFunc(label);
      });
    }
  }

  removeCard(card, removeCardFunc, removeLabelFunc) {
    if (card.shortLink) {
      fetch(REMOVE_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      }).catch(error => console.error(error));
    }
    this.handleLabels(removeLabelFunc);
    removeCardFunc(card);
  }

  static renderCardControl(minimized) {
    return minimized ? (
      <FormDown className="maximize-icon" />
    ) : (
      <FormUp className="minimize-icon" />
    );
  }

  render() {
    const { card, cardActions } = this.props;
    const {
      editCard,
      toggleCard,
      removeCard,
      // minimizeCard,
      // generateCardLink,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          <h5
            style={{
              color: card.color,
            }}
          >
            {card.title}
          </h5>
          {
            cardActions && (
              <div className="buttons-container">
                <Button onClick={() => toggleCard(card)}>
                  <Checkmark
                    style={{
                      stroke: card.color,
                    }}
                    className={classnames({ 'checkmark-icon': true, completed: card.completed })}
                  />
                </Button>
                <Button onClick={() => editCard(card)}>
                  <Edit
                    style={{
                      stroke: card.color,
                    }}
                    className="edit-icon"
                  />
                </Button>
                <Button onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)}>
                  <Trash
                    style={{
                      stroke: card.color,
                    }}
                    className="close-icon"
                    color={card.color}
                  />
                </Button>
              </div>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
