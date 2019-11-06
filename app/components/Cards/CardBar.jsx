import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Archive, Trash, Edit } from 'grommet-icons';
import FocusIcon from 'UI/FocusIcon';
import { toast } from 'react-toastify';
import Tooltip from 'UI/Tooltip';
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
    const {
      card, cardActions, isFocused, color,
    } = this.props;
    const {
      editCard, toggleCard, removeCard, focusCard,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          {cardActions && (
            <div className="buttons-container">
              <Button
                active={card.isEditing}
                hoverIndicator="dark-1"
                onClick={() => editCard(card, isFocused)}
              >
                <Tooltip
                  icon={<Edit color={card.isEditing ? 'brand' : color} />}
                  text="Edit this card (You can also double click the card)"
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
                <Tooltip
                  text="Focus this card"
                  icon={<FocusIcon color={isFocused ? null : color} />}
                />
              </Button>
              <Button
                hoverIndicator="dark-1"
                active={card.completed || card.archived}
                onClick={() => toggleCard(card)}
              >
                <Tooltip
                  icon={(
                    <Archive
                      style={{
                        transition: 'all 0.5s ease-in',
                      }}
                      color={color}
                    />
)}
                  text="Archive card"
                />
              </Button>
              <Button
                hoverIndicator="dark-1"
                onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)
                }
              >
                <Tooltip
                  icon={(
                    <Trash
                      style={{
                        stroke: color,
                      }}
                      color={color}
                    />
)}
                  text="Delete card (Permanent)"
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
  color: PropTypes.string.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};
