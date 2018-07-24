import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Toast from 'grommet/components/Toast';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

import '!style-loader!css-loader!sass-loader!./ReminderItem.scss'; // eslint-disable-line
import unNest from '../../utils/nest';
import toMilliSeconds from '../../utils/time';
import ReminderBar from './ReminderBar';

const ALERT_TIMES = {
  daily: toMilliSeconds.day,
  weekly: toMilliSeconds.week,
  monthly: toMilliSeconds.month,
};

function buildReminderSeries(reminderStats) {
  // const getRandomColor = () => `hsl(${Math.floor((Math.random() * 360) + 1)}, 70%, 70%)`;
  const { completed, failed, snooze } = reminderStats;
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
export function reminderNeedsAlert(lastAlert, frequency) {
  const currentDate = new Date().getTime();
  const reminderAlertTime = ALERT_TIMES[frequency];
  if (lastAlert) {
    const needsAlert = currentDate - new Date(lastAlert).getTime() > reminderAlertTime;
    return needsAlert;
  }
  return true;
}
export default class ReminderItem extends Component {
  getReminderStats() {
    const { reminder } = this.props;
    const { reminderStats } = reminder;
    return {
      completed: (reminderStats && reminderStats.completed) || 0,
      failed: (reminderStats && reminderStats.failed) || 0,
      snooze: (reminderStats && reminderStats.snooze) || 0,
      consecutive: (reminderStats && reminderStats.consecutive) || 0,
      record: (reminderStats && reminderStats.record) || 0,
      ...reminderStats,
    };
  }

  toastNotification() {
    const { reminder, snoozeReminder, failReminder, completeReminder } = this.props;
    const { reminderFrequency, reminderStats } = reminder;
    const { lastAlertDate } = reminderStats;
    if (reminderNeedsAlert(lastAlertDate, reminderFrequency)) {
      return (
        <Toast status="warning" style={{ color: '#64ffda' }}>
          {reminder.title} needs to confirmed
          {ReminderBar.alertBar(completeReminder, reminder, snoozeReminder, failReminder, false)}
        </Toast>
      );
    }
    return '';
  }

  render() {
    const color = unNest(this, 'props.reminder.color') || '#1DE9B6';
    const {
      reminder,
      removeReminder,
      editReminder,
      snoozeReminder,
      failReminder,
      completeReminder,
    } = this.props;
    const stats = this.getReminderStats();
    const reminderActions = {
      removeReminder,
      editReminder,
      snoozeReminder,
      failReminder,
      completeReminder,
    };
    const series = buildReminderSeries(stats);
    const max = series.reduce((a, b) => a + b.value, 0);
    const fontColor = tinycolor(color).darken(50);
    return (
      <Card
        className={'reminder-item'}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color,
          color: fontColor,
        }}
      >
        {this.toastNotification()}
        <ReminderBar reminderActions={reminderActions} reminder={reminder} />
        <Heading align="start" tag="h3" strong>
          {reminder.title}
        </Heading>
        <div
          className="reminder-chart"
          style={{
            color: fontColor,
          }}
        >
          <AnnotatedMeter
            type="circle"
            size="small"
            series={series}
            legend
            max={max}
            className="reminder-chart"
          />
        </div>
      </Card>
    );
  }
}

ReminderItem.propTypes = {
  reminder: PropTypes.object.isRequired,
  removeReminder: PropTypes.func.isRequired,
  editReminder: PropTypes.func.isRequired,
  snoozeReminder: PropTypes.func.isRequired,
  failReminder: PropTypes.func.isRequired,
  completeReminder: PropTypes.func.isRequired,
};
