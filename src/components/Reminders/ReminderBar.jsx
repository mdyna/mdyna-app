import React, { Component } from 'react';
import Share from 'grommet/components/icons/base/Share';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import EditIcon from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

import '!style-loader!css-loader!sass-loader!./ReminderBar.scss'; // eslint-disable-line

class ReminderBar extends Component {
  render() {
    const { reminderActions, reminder } = this.props;
    const {
      removeReminder,
      editReminder,
      snoozeReminder,
      failReminder,
      completeReminder,
    } = reminderActions;
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
            <CloseIcon className="close-icon" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ReminderBar;

ReminderBar.propTypes = {
  reminderActions: PropTypes.object.isRequired,
  reminder: PropTypes.object.isRequired,
};
