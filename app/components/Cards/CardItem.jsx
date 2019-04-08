import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import Labels from 'UI/Labels';
import MarkdownText from 'UI/MarkdownText';
import unNest from 'Utils/nest';
import assertNoteChanges from 'Utils/assertChanges';
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
  setTimeout(() => card.scrollToCard(), 500);
}

class MdynaCard extends Component {
  state = {
    isHovered: false,
    minimized: unNest(this.props, 'card.text') && unNest(this.props, 'card.text').length > 300, // automatically clip over 500 chars
  };

  name = 'Mdyna Card';

  cardTitleRef = React.createRef();

  shouldComponentUpdate(nextProps) {
    const { card } = this.props;
    if (nextProps.card && card) {
      return assertNoteChanges(nextProps.card, card);
    }
    return false;
  }

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
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    // eslint-disable-next-line
    const convertDateToLocaleString = (date = new Date()) => new Date(date).toLocaleDateString(undefined, dateOptions);
    if (lastEditDate) {
      const formattedDate = convertDateToLocaleString(lastEditDate);
      return (
        <span className="card-date">
          Last edit on
          {' '}
          <span>{formattedDate}</span>
        </span>
      );
    }
    const formattedDate = convertDateToLocaleString(startDate);
    return (
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
      saveCard,
      removeCard,
      editCard,
      removeLabel,
    } = this.props;

    const { isHovered, minimized } = this.state;
    const color = (card && card.color) || changeCardSetting('color', _.sample(COLOR_SAMPLES));
    const minimize = showAllText ? false : minimized;
    const noteActions = {
      toggleCard,
      removeCard,
      minimizeCard: card.text && card.text.length > 300 ? minimizeCard : null,
      editCard,
      removeLabel,
    };
    const displayControl = noteActions.minimizeCard && !showAllText;
    return (
      <Card
        key={i}
        role="button"
        tabIndex={0}
        onDoubleClick={() => {
          noteActions.editCard(card);
        }}
        className={classnames(
          className,
          COLOR_LABELS[color],
          'card-item',
          noteActions.minimizeCard && !minimized && 'expanded',
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
          backgroundColor: color || '#4E636E',
          filter: (isHovered && `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`) || null,
        }}
      >
        {hasCardBar ? (
          <CardBar
            card={card}
            cardActions={noteActions}
            cardItem={this}
            options={{
              minimized,
            }}
          />
        ) : (
          ''
        )}
        <Heading align="start" tag="h1" strong ref={this.cardTitleRef}>
          {card.title}
        </Heading>
        <Labels labels={card.labels} color={color} />
        {this.renderCardDate()}
        <MarkdownText
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
            onClick={() => noteActions.minimizeCard(this)}
            className="card-control"
            style={{
              opacity: 0.5,
              borderRadius: '10px',
              padding: 5,
              height: !displayControl && 0,
              visibility: (displayControl && 'initial') || 'hidden',
            }}
          >
            {CardBar.renderCardControl(minimized)}
          </Button>
        }
      </Card>
    );
  }
}

export default MdynaCard;

MdynaCard.propTypes = {
  card: PropTypes.object.isRequired,
  toggleCard: PropTypes.func,
  saveCard: PropTypes.func,
  hasCardBar: PropTypes.bool,
  whiteMode: PropTypes.bool,
  showAllText: PropTypes.bool,
  editCard: PropTypes.func,
  className: PropTypes.string,
  removeCard: PropTypes.func,
  removeLabel: PropTypes.func,
  changeCardSetting: PropTypes.func,
  i: PropTypes.number,
};

MdynaCard.defaultProps = {
  i: 0,
  changeCardSetting: null,
  removeCard: null,
  saveCard: null,
  editCard: null,
  whiteMode: false,
  showAllText: false,
  removeLabel: null,
  toggleCard: null,
  hasCardBar: false,
  className: '',
};
