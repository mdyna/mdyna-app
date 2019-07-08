import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Checkmark, Trash, Edit, FormUp, FormDown,
} from 'grommet-icons';
import classnames from 'classnames';
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
    const { card, cardActions, title } = this.props;
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
          <TextInput
            style={{
              padding: 0,
              color: card.color,
            }}
            ref={this.inputRef}
            value={currentTitle}
            onBlur={() => {
              changeTitle(card, currentTitle);
              this.setState({ editingTitle: false });
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && editingTitle) {
                changeTitle(card, e.target.value);
                this.setState({ editingTitle: false, currentTitle: e.target.value });
                console.log(this.inputRef.current);
                this.inputRef.current.blur();
              }
            }}
            type="text"
            onClick={() => this.setState({ editingTitle: true })}
            onChange={e => editingTitle && this.setState({ currentTitle: e.target.value })}
            plain
          />
          {cardActions && (
            <div className="buttons-container">
              <Button onClick={() => toggleCard(card)}>
                <Checkmark
                  style={{
                    stroke: card.color,
                  }}
                  className={classnames({
                    'checkmark-icon': true,
                    completed: card.completed,
                  })}
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
