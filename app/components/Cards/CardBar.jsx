import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import MinimizeIcon from 'grommet/components/icons/base/Up';
import MaximizeIcon from 'grommet/components/icons/base/Down';
import Button from 'UI/Button';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';
import assertCardChanges from '../../utils/assertChanges';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';

import './CardBar.scss'; // eslint-disable-line

const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;

class CardBar extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.card && this.props.card) {
      return assertCardChanges(nextProps.card, this.props.card);
    }
    return false;
  }

  handleLabels(removeLabelFunc) {
    const { card } = this.props;
    const labels = card.labels;
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
      <MaximizeIcon className="maximize-icon" />
    ) : (
      <MinimizeIcon className="minimize-icon" />
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
        <div
          className="card-bar"
          style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(card.color).darken(25)})` }}
        >
          {card.title}
          <Button onClick={() => toggleCard(card)}>
            <CheckmarkIcon
              className={classnames({ 'checkmark-icon': true, completed: card.completed })}
            />
          </Button>
          <Button onClick={() => editCard(card)}>
            <EditIcon className="edit-icon" />
          </Button>
          <Button onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)}>
            <TrashIcon className="close-icon" color={card.color} />
          </Button>
          {
            // isNote ? <CardShareButton card={card} generateCardLinkFunc={generateCardLink} /> : ''
          }
          {
            // minimizeCard ? this.renderCardControl(minimized, minimizeCard) : ''
          }
        </div>
        {
          // assertTaskAlerts(lastAlertDate, cardFrequency)
        }
      </React.Fragment>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  cardActions: PropTypes.object.isRequired,
};
