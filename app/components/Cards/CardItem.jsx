import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import Button from 'UI/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sample from 'lodash/sample';
import Labels from 'UI/Labels';
import MarkdownText from 'UI/MarkdownText';
import unNest from 'Utils/nest';
import { convertDateToLocaleString } from 'Utils/dates';
import { FormUp, FormDown } from 'grommet-icons';
import CardBar from './CardBar';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';

import './CardItem.scss'; // eslint-disable-line

export const COLOR_SAMPLES = [
  '#ff8a80',
  '#ff80ab',
  '#ea80fc',
  '#8c9eff',
  '#80d8ff',
  '#a7ffeb',
  '#b9f6ca',
  '#fff475',
  '#ffd180',
  '#a7c0cd',
];

const COLOR_LABELS = {
  '#ff8a80': 'red',
  '#ff80ab': 'pink',
  '#ea80fc': 'purple',
  '#8c9eff': 'dark-blue',
  '#80d8ff': 'light-blue',
  '#a7ffeb': 'mdyna-green',
  '#b9f6ca': 'green',
  '#fff475': 'yellow',
  '#ffd180': 'orange',
  '#a7c0cd': 'grey',
};

function minimizeCard(card) {
  card.setState({
    minimized: (card && card.state && !card.state.minimized) || false,
  });
  card.scrollToCard();
}

class MdynaCard extends PureComponent {
  state = {
    isHovered: false,
    minimized:
      unNest(this.props, 'card.text')
      && unNest(this.props, 'card.text').length > 300, // automatically clip over 500 chars
  };

  name = 'Mdyna Card';

  scrollToCard() {
    // eslint-disable-next-line
    ReactDOM.findDOMNode(this).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

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
      i,
      className,
      hasCardBar,
      whiteMode,
      changeCardSetting,
      showAllText,
      toggleCard,
      changeTitle,
      saveCard,
      isFocused,
      removeCard,
      focusCard,
      editCard,
      removeLabel,
      addLabelFilter,
      removeLabelFilter,
      labelFilters,
      codeTheme,
    } = this.props;

    const { isHovered, minimized } = this.state;
    const labelFuncs = { addLabelFilter, removeLabelFilter };
    const color = (card && card.color) || changeCardSetting('color', sample(COLOR_SAMPLES));
    const minimize = showAllText ? false : minimized;
    const cardActions = {
      toggleCard,
      removeCard,
      minimizeCard: card.text && card.text.length > 300 ? minimizeCard : null,
      editCard,
      focusCard,
      removeLabel,
      changeTitle,
    };
    const displayControl = cardActions.minimizeCard && !showAllText;
    return (
      <Box
        key={i}
        role="button"
        tabIndex={0}
        onDoubleClick={() => {
          cardActions.editCard(card);
        }}
        className={classnames(
          className,
          COLOR_LABELS[color],
          'card-item',
          cardActions.minimizeCard && !minimized && 'expanded',
        )}
        onMouseEnter={() => this.setState({
          isHovered: true,
        })
        }
        onMouseLeave={() => this.setState({
          isHovered: false,
        })
        }
        style={{
          backgroundColor: color,
          transition: 'width 0.5s ease-in',
          filter:
            (isHovered
              && `drop-shadow(1px -3px 3px ${tinycolor(color).darken(25)})`)
            || null,
        }}
      >
        <CardBar
          card={card}
          isFocused={Boolean(isFocused)}
          cardActions={hasCardBar ? cardActions : ''}
          cardItem={this}
          title={card.title}
          options={{
            minimized,
          }}
        />
        <Labels
          labelFuncs={labelFuncs}
          labelFilters={labelFilters}
          labels={card.labels}
          color={color}
        />
        {this.renderCardDate()}
        <MarkdownText
          codeTheme={codeTheme}
          whiteMode={whiteMode}
          className="note-card-content"
          minimized={minimize}
          color={color}
          editCard={{
            card,
            saveFunc: saveCard,
          }}
          text={card.text}
        />
        {
          <Button
            onClick={() => cardActions.minimizeCard(this)}
            className="card-control"
            style={{
              height: !displayControl && 0,
              visibility: (displayControl && 'initial') || 'hidden',
            }}
          >
            {minimized ? (
              <FormDown className="maximize-icon" />
            ) : (
              <FormUp className="minimize-icon" />
            )}
          </Button>
        }
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
  whiteMode: PropTypes.bool,
  showAllText: PropTypes.bool,
  editCard: PropTypes.func,
  changeTitle: PropTypes.func.isRequired,
  labelFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  removeCard: PropTypes.func,
  removeLabel: PropTypes.func,
  changeCardSetting: PropTypes.func,
  focusCard: PropTypes.func,
  addLabelFilter: PropTypes.func,
  removeLabelFilter: PropTypes.func,
  i: PropTypes.number,
};

MdynaCard.defaultProps = {
  i: 0,
  changeCardSetting: null,
  removeCard: null,
  saveCard: null,
  editCard: null,
  isFocused: false,
  whiteMode: false,
  codeTheme: 'Default',
  showAllText: false,
  addLabelFilter: null,
  removeLabelFilter: null,
  removeLabel: null,
  labelFilters: [],
  focusCard: null,
  toggleCard: null,
  hasCardBar: false,
  className: '',
};
