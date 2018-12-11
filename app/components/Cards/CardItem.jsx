import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Toast from 'grommet/components/Toast';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import CardBar from '../Cards/CardBar';
import unNest from '../../utils/nest';
import assertNoteChanges from '../../utils/assertChanges';
import assertTaskAlerts from '../../utils/assertTaskAlerts';
import MarkdownText from '../MarkdownText';
import Labels from '../Labels';

import '!style-loader!css-loader!sass-loader!./CardItem.scss'; // eslint-disable-line
import AlertBar from './AlertBar';

export const COLOR_SAMPLES = [
  '#03A9F4',
  '#0D47A1',
  '#4E636E',
  '#64FFDA',
  '#4CAF50',
  '#FFEB3B',
  '#FF7043',
  '#F44336',
  '#F48FB0',
];

const COLOR_LABELS = {
  '#03A9F4': 'light-blue',
  '#0D47A1': 'dark-blue',
  '#4E636E': 'grey',
  '#64FFDA': 'dyna-green',
  '#4CAF50': 'green',
  '#FFEB3B': 'yellow',
  '#FF7043': 'orange',
  '#F44336': 'red',
  '#F48FB0': 'pink',
};

function buildTaskSeries(cardStats) {
  // const getRandomColor = () => `hsl(${Math.floor((Math.random() * 360) + 1)}, 70%, 70%)`;
  const { completed, failed, snooze } = cardStats;
  return [
    {
      label: 'Completed',
      value: completed || 0,
      colorIndex: 'accent-1',
    },
    {
      label: 'Failed',
      value: failed || 0,
      colorIndex: 'accent-2',
    },
    {
      label: 'Snoozed',
      value: snooze || 0,
      colorIndex: 'neutral-2',
    },
  ];
}

function minimizeCard(card) {
  card.setState({
    minimized: (card && card.state && !card.state.minimized) || false,
  });
}

class dynaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  toastNotification() {
    const { card, snoozeCard, failCard, completeCard } = this.props;
    const { cardFrequency, cardStats } = card;
    if (cardFrequency) {
      const lastAlertDate = (cardStats && cardStats.lastAlertDate) || null;
      if (assertTaskAlerts(lastAlertDate, cardFrequency)) {
        return (
          <Toast
            status="warning"
            style={{ color: '#64ffda', backgroundColor: 'rgba(5,7,9, 0.7)' }}
          >
            {card.title} needs to confirmed
            <AlertBar
              card={card}
              completeCard={completeCard}
              snoozeCard={snoozeCard}
              failCard={failCard}
              showNotificationIcon={false}
            />
          </Toast>
        );
      }
    }
    return '';
  }

  render() {
    const { card, i, className, hasCardBar, whiteMode, cardOptions } = this.props;

    const color =
      (card && card.color) || this.props.changeCardSetting('color', _.sample(COLOR_SAMPLES));
    const stats = this.getCardStats();
    const series = buildTaskSeries(stats);
    const max = series.reduce((a, b) => a + b.value, 0);
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

    return (
      <Card
        key={i}
        className={classnames(className, COLOR_LABELS[color], 'card-item', {
          minimized: this.state.minimized,
          'task-item': cardOptions.isTask,
        })}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color || '#4E636E',
        }}
      >
        {cardOptions.isTask ? this.toastNotification() : ''}
        {hasCardBar ? (
          <CardBar
            card={card}
            cardActions={noteActions}
            cardItem={this}
            options={{
              ...cardOptions,
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
        {cardOptions.isTask ? (
          <div
            className="task-chart"
            style={{
              color: tinycolor(color).darken(50),
            }}
          >
            {this.state.minimized ? (
              ''
            ) : (
              <AnnotatedMeter
                type="circle"
                size="small"
                series={series}
                legend
                max={max}
                className="task-chart"
              />
            )}
          </div>
        ) : (
          ''
        )}
        <MarkdownText
          whiteMode={whiteMode}
          className="note-card-content"
          minimized={minimize}
          color={color}
          text={card.text}
        />
      </Card>
    );
  }
}

export default dynaCard;

dynaCard.propTypes = {
  card: PropTypes.object.isRequired,
  snoozeCard: PropTypes.func,
  failCard: PropTypes.func,
  toggleCard: PropTypes.func,
  completeCard: PropTypes.func,
  hasCardBar: PropTypes.bool,
  whiteMode: PropTypes.bool,
  cardOptions: PropTypes.object,
  showAllText: PropTypes.bool,
  editCard: PropTypes.func,
  className: PropTypes.string,
  removeCard: PropTypes.func,
  removeLabel: PropTypes.func,
  generateCardLink: PropTypes.func,
  changeCardSetting: PropTypes.func.isRequired,
  i: PropTypes.number,
};

dynaCard.defaultProps = {
  i: 0,
  removeCard: null,
  snoozeCard: null,
  failCard: null,
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
  cardOptions: {
    isNote: true,
    isTask: false,
  },
};
