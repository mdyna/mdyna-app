import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Archive, Trash, Edit, View,
} from 'grommet-icons';
import { toast } from 'react-toastify';
import Button from 'UI/Button';
import './CardBar.scss'; // eslint-disable-line

class CardBar extends PureComponent {
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
    this.handleLabels(removeLabelFunc);
    removeCardFunc(card);
  }

  render() {
    const { card, cardActions, isFocused } = this.props;
    const {
      editCard, toggleCard, removeCard, focusCard,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          {cardActions && (
            <div className="buttons-container">
              <Button hoverIndicator="dark-1" onClick={() => editCard(card)}>
                <Edit
                  style={{
                    stroke: card.color,
                  }}
                />
              </Button>
              <Button
                active={isFocused}
                hoverIndicator="dark-1"
                onClick={() => {
                  focusCard(isFocused ? null : card);
                  if (!isFocused) {
                    toast.info('Press ESC to show all cards');
                  }
                }}
              >
                <View color={isFocused ? 'accent-3' : card.color} />
              </Button>
              <Button
                hoverIndicator="dark-1"
                active={card.completed || card.archived}
                onClick={() => toggleCard(card)}
              >
                <Archive
                  style={{
                    transition: 'all 0.5s',
                  }}
                  color={card.color}
                />
              </Button>
              <Button
                hoverIndicator="dark-1"
                onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)
                }
              >
                <Trash
                  style={{
                    stroke: card.color,
                  }}
                  color={card.color}
                />
              </Button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};
