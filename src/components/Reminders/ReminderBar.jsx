import React, { Component } from 'react';
import NotificationIcon from 'grommet/components/icons/base/Notification';
import AlarmIcon from 'grommet/components/icons/base/Alarm';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

import '!style-loader!css-loader!sass-loader!./ReminderBar.scss'; // eslint-disable-line
import { reminderNeedsAlert } from './ReminderItem';
import unNest from '../../utils/nest';

class ReminderBar extends Component {
  static alertBar(completeReminder, reminder, snoozeReminder, failReminder, showNotificationIcon) {
    return (
      <div className="alert-actions">
        {showNotificationIcon ? <NotificationIcon className="notification-icon" /> : ''}
        <Button onClick={() => completeReminder(reminder)}>
          <CheckmarkIcon className="complete-reminder-icon" />
        </Button>
        <Button onClick={() => snoozeReminder(reminder)}>
          <AlarmIcon className="snooze-reminder-icon" />
        </Button>
        <Button onClick={() => failReminder(reminder)}>
          <CloseIcon className="fail-reminder-icon" />
        </Button>
      </div>
    );
  }

  render() {
    const { reminderActions, reminder } = this.props;
    const {
      removeReminder,
      editReminder,
      snoozeReminder,
      failReminder,
      completeReminder,
    } = reminderActions;
    const { reminderFrequency } = reminder;
    const lastAlertDate = unNest(reminder, 'reminderStats.lastAlertDate') || null;
    return (
      <div
        className="reminder-bar"
        style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(reminder.color).darken(25)})` }}
      >
        <div className="general-actions">
          <Button
            onClick={() =>
              editReminder({ ...reminder, repeat: true, repeatAlert: reminder.reminderFrequency })
            }
          >
            <EditIcon className="edit-icon" />
          </Button>
          <Button onClick={() => removeReminder(reminder)}>
            <TrashIcon className="close-icon" />
          </Button>
        </div>
        {reminderNeedsAlert(lastAlertDate, reminderFrequency)
          ? ReminderBar.alertBar(completeReminder, reminder, snoozeReminder, failReminder, true)
          : ''}
      </div>
    );
  }
}

export default ReminderBar;

ReminderBar.propTypes = {
  reminderActions: PropTypes.object.isRequired,
  reminder: PropTypes.object.isRequired,
};
