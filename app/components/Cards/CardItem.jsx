import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import CardBar from '../Cards/CardBar';
import unNest from '../../utils/nest';
import assertNoteChanges from '../../utils/assertChanges';
// import assertTaskAlerts from '../../utils/assertTaskAlerts';
import MarkdownText from '../MarkdownText';
import Labels from '../Labels';

import '!style-loader!css-loader!sass-loader!./CardItem.scss'; // eslint-disable-line

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
}

class MdynaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      minimized: unNest(props, 'card.text') && unNest(props, 'card.text').length > 300, // automatically clip over 500 chars
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.card && this.props.card) {
      return assertNoteChanges(nextProps.card, this.props.card);
    }
    return false;
  }

  getCardStats() {
    const { card } = this.props;
    const { cardStats } = card;
    return {
      completed: (cardStats && cardStats.completed) || 0,
      failed: (cardStats && cardStats.failed) || 0,
      snooze: (cardStats && cardStats.snooze) || 0,
      consecutive: (cardStats && cardStats.consecutive) || 0,
      record: (cardStats && cardStats.record) || 0,
      ...cardStats,
    };
  }

  render() {
    const { card, i, className, hasCardBar, whiteMode } = this.props;

    const color =
      (card && card.color) || this.props.changeCardSetting('color', _.sample(COLOR_SAMPLES));
    const minimize = this.props.showAllText ? false : this.state.minimized;
    const noteActions = {
      generateCardLink: this.props.generateCardLink,
      toggleCard: this.props.toggleCard,
      removeCard: this.props.removeCard,
      minimizeCard: card.text && card.text.length > 300 ? minimizeCard : null,
      editCard: this.props.editCard,
      removeLabel: this.props.removeLabel,
      snoozeCard: this.props.snoozeCard,
      failCard: this.props.failCard,
      completeCard: this.props.completeCard,
    };
    const displayControl = noteActions.minimizeCard && !this.props.showAllText;
    return (
      <Card
        key={i}
        className={classnames(className, COLOR_LABELS[color], 'card-item', {
          minimized: this.state.minimized,
        })}
        onMouseEnter={() =>
          this.setState({
            isHovered: true,
          })
        }
        onMouseLeave={() =>
          this.setState({
            isHovered: false,
          })
        }
        style={{
          backgroundColor: color || '#4E636E',
          filter:
            (this.state.isHovered && `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`) ||
            null,
        }}
      >
        {hasCardBar ? (
          <CardBar
            card={card}
            cardActions={noteActions}
            cardItem={this}
            options={{
              minimized: this.state.minimized,
            }}
          />
        ) : (
          ''
        )}
        <Heading align="start" tag="h1" strong>
          {card.title}
        </Heading>
        <Labels labels={card.labels} color={color} />
        <div
          role="button"
          tabIndex={0}
          onDoubleClick={() => {
            noteActions.editCard(card);
          }}
        >
          <MarkdownText
            whiteMode={whiteMode}
            className="note-card-content"
            minimized={minimize}
            color={color}
            editCard={{
              card,
              saveFunc: this.props.saveCard,
            }}
            text={card.text}
          />
        </div>
        {(
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
            {CardBar.renderCardControl(this.state.minimized)}
          </Button>
        )}
      </Card>
    );
  }
}

export default MdynaCard;

MdynaCard.propTypes = {
  card: PropTypes.object.isRequired,
  snoozeCard: PropTypes.func,
  failCard: PropTypes.func,
  toggleCard: PropTypes.func,
  saveCard: PropTypes.func,
  completeCard: PropTypes.func,
  hasCardBar: PropTypes.bool,
  whiteMode: PropTypes.bool,
  showAllText: PropTypes.bool,
  editCard: PropTypes.func,
  className: PropTypes.string,
  removeCard: PropTypes.func,
  removeLabel: PropTypes.func,
  generateCardLink: PropTypes.func,
  changeCardSetting: PropTypes.func.isRequired,
  i: PropTypes.number,
};

MdynaCard.defaultProps = {
  i: 0,
  removeCard: null,
  snoozeCard: null,
  failCard: null,
  saveCard: null,
  completeCard: null,
  generateCardLink: null,
  editCard: null,
  whiteMode: false,
  showAllText: false,
  addLabel: null,
  removeLabel: null,
  toggleCard: null,
  hasCardBar: false,
  className: '',
};
