import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Checkmark, Trash, Edit, FormUp, FormDown,
} from 'grommet-icons';
import { TextInput } from 'grommet';
import Button from 'UI/Button';
import unNest from 'Utils/nest';

import './CardBar.scss'; // eslint-disable-line

const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;

class CardBar extends PureComponent {
  state = {
    currentTitle: unNest(this, 'props.title') || unNest(this, 'props.card.title'),
    editingTitle: false,
  };

  inputRef = React.createRef();

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
    const { currentTitle, editingTitle } = this.state;
    const {
      editCard,
      toggleCard,
      removeCard,
      changeTitle,
      // minimizeCard,
      // generateCardLink,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          {!editingTitle ? (
            <Button
              plain
              style={{
                color: card.color,
                width: '100%',
              }}
              onClick={(e) => {
                e.preventDefault();
                this.setState({ editingTitle: true });
              }}
              hoverIndicator="dark-1"
            >
              {card.title}
            </Button>
          ) : (
            <TextInput
              style={{
                padding: 0,
                borderBottom: editingTitle && `1px solid ${card.color}`,
                color: card.color,
              }}
              ref={this.inputRef}
              value={currentTitle}
              onBlur={() => {
                const newTitle = currentTitle || 'Untitled Card';
                changeTitle(card, newTitle);
                this.setState({ editingTitle: false, currentTitle: newTitle });
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && editingTitle) {
                  const newTitle = e.target.value || 'Untitled Card';
                  changeTitle(card, newTitle);
                  this.setState({ editingTitle: false, currentTitle: newTitle });
                  this.inputRef.current.blur();
                }
              }}
              className={editingTitle && 'editing'}
              type="text"
              onChange={e => editingTitle && this.setState({ currentTitle: e.target.value })}
              plain
            />
          )}
          {cardActions && (
            <div className="buttons-container">
              <Button hoverIndicator="dark-1" onClick={() => toggleCard(card)}>
                <Checkmark
                  style={{
                    transition: 'all 0.5s',
                  }}
                  color={card.completed ? 'accent-3' : card.color}
                />
              </Button>
              <Button hoverIndicator="dark-1" onClick={() => editCard(card)}>
                <Edit
                  style={{
                    stroke: card.color,
                  }}
                  className="edit-icon"
                />
              </Button>
              <Button
                hoverIndicator="dark-1"
                onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)}
              >
                <Trash
                  style={{
                    stroke: card.color,
                  }}
                  className="close-icon"
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
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
