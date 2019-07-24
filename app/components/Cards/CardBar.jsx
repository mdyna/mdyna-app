import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Checkmark, Trash, Edit, View,
} from 'grommet-icons';
import { TextInput } from 'grommet';
import onClickOutside from 'react-onclickoutside';
import { toast } from 'react-toastify';
import tc from 'tinycolor2';
import Button from 'UI/Button';
import unNest from 'Utils/nest';
import './CardBar.scss'; // eslint-disable-line


class CardBar extends PureComponent {
  state = {
    currentTitle:
      unNest(this, 'props.title') || unNest(this, 'props.card.title'),
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

  cardTitleInput() {
    const { card, cardActions } = this.props;
    const { changeTitle } = cardActions;
    const { currentTitle, editingTitle } = this.state;

    return !editingTitle ? (
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
          borderBottom:
            editingTitle
            && (currentTitle !== card.title
              ? `1px solid ${tc(card.color).brighten(25)}`
              : `1px solid ${card.color}`),
          color: card.color,
        }}
        ref={this.inputRef}
        value={currentTitle}
        onBlur={() => {
          const newTitle = currentTitle || 'Untitled Card';
          changeTitle(card, newTitle);
          this.setState({ editingTitle: false, currentTitle: newTitle });
        }}
        onDoubleClick={e => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && editingTitle) {
            const newTitle = e.target.value || 'Untitled Card';
            changeTitle(card, newTitle);
            this.setState({
              editingTitle: false,
              currentTitle: newTitle,
            });
            this.inputRef.current.blur();
          }
        }}
        className={editingTitle && 'editing'}
        type="text"
        onChange={e => editingTitle && this.setState({ currentTitle: e.target.value })
        }
        plain
      />
    );
  }

  removeCard(card, removeCardFunc, removeLabelFunc) {
    this.handleLabels(removeLabelFunc);
    removeCardFunc(card);
  }

  handleClickOutside() {
    const { card, cardActions } = this.props;
    const { changeTitle } = cardActions;
    const { currentTitle, editingTitle } = this.state;
    if (editingTitle) {
      const newTitle = currentTitle || 'Untitled Card';
      changeTitle(card, newTitle);
      this.setState({ editingTitle: false, currentTitle: newTitle });
    }
  }

  render() {
    const { card, cardActions, isFocused } = this.props;
    const {
      editCard, toggleCard, removeCard, focusCard,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          {this.cardTitleInput()}
          {cardActions && (
            <div className="buttons-container">
              <Button hoverIndicator="dark-1" active={card.completed} onClick={() => toggleCard(card)}>
                <Checkmark
                  style={{
                    transition: 'all 0.5s',
                  }}
                  color={card.color}
                />
              </Button>
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

export default onClickOutside(CardBar);

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};
