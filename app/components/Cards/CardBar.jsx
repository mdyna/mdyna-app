import React, { Component } from 'react';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import MinimizeIcon from 'grommet/components/icons/base/Up';
import MaximizeIcon from 'grommet/components/icons/base/Down';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';
import CardShareButton from './CardShareButton';
import assertCardChanges from '../../utils/assertChanges';
import assertTaskAlerts from '../../utils/assertTaskAlerts';
import unNest from '../../utils/nest';

import '!style-loader!css-loader!sass-loader!./CardBar.scss'; // eslint-disable-line
import AlertBar from './AlertBar';

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
      }).catch(error => console.log(error));
    }
    this.handleLabels(removeLabelFunc);
    removeCardFunc(card);
  }

  renderCardControl(minimized, minimizeFunc) {
    return minimized ? (
      <Button onClick={() => minimizeFunc(this.props.cardItem)}>
        <MaximizeIcon className="maximize-icon" />
      </Button>
    ) : (
      <Button onClick={() => minimizeFunc(this.props.cardItem)}>
        <MinimizeIcon className="minimize-icon" />
      </Button>
    );
  }

  render() {
    const { card, cardActions, options } = this.props;
    const { isTask, isNote, minimized } = options;
    const {
      editCard,
      snoozeCard,
      failCard,
      completeCard,
      toggleCard,
      removeCard,
      minimizeCard,
      generateCardLink,
    } = cardActions;
    const { cardFrequency } = card;
    const lastAlertDate = unNest(card, 'cardStats.lastAlertDate') || null;
    return (
      <React.Fragment>
        <div
          className="card-bar"
          style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(card.color).darken(25)})` }}
        >
          {isNote ? (
            <Button onClick={() => toggleCard(card)}>
              <CheckmarkIcon
                className={classnames({ 'checkmark-icon': true, completed: card.completed })}
              />
            </Button>
          ) : (
            ''
          )}
          <Button onClick={() => editCard(card)}>
            <EditIcon className="edit-icon" />
          </Button>
          <Button onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)}>
            <TrashIcon className="close-icon" />
          </Button>
          {
            // isNote ? <CardShareButton card={card} generateCardLinkFunc={generateCardLink} /> : ''
          }
          {minimizeCard ? this.renderCardControl(minimized, minimizeCard) : ''}
        </div>
        {assertTaskAlerts(lastAlertDate, cardFrequency) && isTask ? (
          <AlertBar
            completeCard={completeCard}
            card={card}
            snoozeCard={snoozeCard}
            failCard={failCard}
            showNotificationIcon
          />
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  cardActions: PropTypes.object.isRequired,
  cardItem: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};
