import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Labels from 'UI/Labels';
import Editor from 'Components/MarkdownEditor';
import { convertDateToLocaleString } from 'Utils/dates';
import { COLOR_LABELS, getRandomColor } from 'Utils/colors';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import CardBar from './CardBar';
import CardEditor from './CardEditor';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';

import './CardItem.scss'; // eslint-disable-line

class MdynaCard extends Component {
  name = 'Mdyna Card';

  getCardContent() {
    const { card } = this.props;
    const {
      isEditing, text, title, editingText, editingTitle,
    } = card;
    return !isEditing
      ? { title, text }
      : { title: editingTitle, text: editingText };
  }

  /*
  scrollToCard() {
    ReactDOM.findDOMNode(this).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  } */

  renderCardDate() {
    const { card } = this.props;
    const { startDate, lastEditDate } = card;
    const lastEditDateFormatted = convertDateToLocaleString(lastEditDate);
    const startDateFormatted = convertDateToLocaleString(startDate);
    const datesAreDifferent = lastEditDateFormatted !== startDateFormatted;
    const formattedDate = datesAreDifferent
      ? lastEditDateFormatted
      : startDateFormatted;
    return datesAreDifferent ? (
      <span className="card-date">
        Last edit on
        {' '}
        <span>{formattedDate}</span>
      </span>
    ) : (
      <span className="card-date">
        Created on
        {' '}
        <span>{formattedDate}</span>
      </span>
    );
  }

  render() {
    const {
      card,
      className,
      hasCardBar,
      changeCardSetting,
      toggleCard,
      saveCard,
      isFocused,
      removeCard,
      focusCard,
      editCard,
      removeLabel,
      addLabel,
      discardCardChanges,
      addLabelFilter,
      removeLabelFilter,
      labelFilters,
      whiteMode,
      globalLabels,
      createBoard,
      boards,
      boardNames,
      toggleBoardsDialog,
      codeTheme,
    } = this.props;
    const labelFuncs = { addLabelFilter, removeLabelFilter };
    const cardContent = this.getCardContent();
    const color = (card && card.editingColor)
      || card.color
      || (changeCardSetting
        && changeCardSetting('color', getRandomColor(), card.id, isFocused, card));
    const cardActions = {
      toggleCard,
      removeCard,
      editCard,
      focusCard,
      removeLabel,
    };
    const getCardText = (title, text) => {
      if (title && text) {
        return `# ${card.title}
${card.text}`;
      }
      if (title && !text) {
        return `# ${card.title}`;
      }
      return text;
    };
    return (
      <Box
        key={card.id}
        role="button"
        tabIndex={0}
        onDoubleClick={() => {
          if (!card.isEditing) {
            cardActions.editCard(card, isFocused);
          }
        }}
        className={classnames(className, COLOR_LABELS[color], 'card-item')}
        style={{
          backgroundColor: color,
          transition: 'all 0.5s ease-in',
          border: card.isEditing && `2px solid ${tinycolor(color).darken(25)}`,
          filter:
            (card.isEditing
              && `drop-shadow(1px -3px 3px ${tinycolor(color).darken(25)})`)
            || null,
        }}
      >
        <KeyboardEventHandler
          handleKeys={['esc']}
          onKeyEvent={(key) => {
            if (card.isEditing && key === 'esc') {
              discardCardChanges(card, Boolean(isFocused));
            }
          }}
        >
          <CardBar
            card={card}
            color={color}
            isFocused={Boolean(isFocused)}
            cardActions={hasCardBar ? cardActions : ''}
            cardItem={this}
            title={card.title}
          />
          <Labels
            labelFuncs={labelFuncs}
            labelFilters={labelFilters}
            labels={card.labels}
            color={color}
          />
          {this.renderCardDate()}
          {card.isEditing && (
            <CardEditor
              onSubmit={c => saveCard(c, isFocused)}
              card={card}
              color={color}
              isFocused={isFocused}
              onChange={changeCardSetting}
              labelPickerProps={{
                onAdd: addLabel,
                onRemove: removeLabel,
                cardLabels: card.editingLabels,
                color,
                globalLabels,
              }}
              boardPickerProps={{
                createBoard,
                boards,
                boardNames,
                toggleBoardsDialog,
              }}
              onDiscard={c => discardCardChanges(c, Boolean(isFocused))}
            />
          )}
          <Editor
            readOnly={!card.isEditing}
            card={{ ...card, title: cardContent.title, text: cardContent.text }}
            defaultValue={cardContent.text}
            onSave={c => saveCard(c, isFocused)}
            codeTheme={codeTheme}
            changeTitle={val => changeCardSetting('editingTitle', val, card.id, isFocused, card)
            }
            whiteMode={whiteMode}
            value={getCardText(cardContent.title, cardContent.text)}
            onChange={val => changeCardSetting('editingText', val, card.id, isFocused, card)
            }
            theme={{
              backgroundColor: 'transparent',
            }}
          />
        </KeyboardEventHandler>
      </Box>
    );
  }
}

export default MdynaCard;

MdynaCard.propTypes = {
  card: PropTypes.object.isRequired,
  isFocused: PropTypes.bool,
  codeTheme: PropTypes.string,
  toggleCard: PropTypes.func,
  saveCard: PropTypes.func,
  hasCardBar: PropTypes.bool,
  discardCardChanges: PropTypes.func.isRequired,
  editCard: PropTypes.func,
  labelFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  removeCard: PropTypes.func,
  whiteMode: PropTypes.bool,
  removeLabel: PropTypes.func,
  changeCardSetting: PropTypes.func,
  focusCard: PropTypes.func,
  globalLabels: PropTypes.array,
  addLabel: PropTypes.func.isRequired,
  addLabelFilter: PropTypes.func,
  createBoard: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
  boardNames: PropTypes.array.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func,
};

MdynaCard.defaultProps = {
  changeCardSetting: null,
  removeCard: null,
  saveCard: null,
  editCard: null,
  isFocused: false,
  globalLabels: [],
  codeTheme: 'Default',
  whiteMode: false,
  addLabelFilter: null,
  removeLabelFilter: null,
  removeLabel: null,
  labelFilters: [],
  focusCard: null,
  toggleCard: null,
  hasCardBar: false,
  className: '',
};
