import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Sidebar from 'grommet/components/Sidebar';
import Toast from 'grommet/components/Toast';

import '!style-loader!css-loader!sass-loader!./ReminderList.scss'; // eslint-disable-line


function checkUncompletedReminders(reminderList) {
  for (let i = 0; i < reminderList.length; i += 1) {
    console.log(reminderList[i]);
  }
}
export default class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: this.props.reminders,
    };
  }

  reminderNotification() {
    const { reminders } = this.props;
    const { daily, weekly, monthly } = reminders;
    return (
      <Toast status="warning">
        Pending reminders need to be validated
      </Toast>
    )
  }

  render() {
    return (
      <Sidebar className="reminder-list" size="small" full={false}>
        {this.reminderNotification()}
        <Headline align="center" size="small">
          Reminders
        </Headline>
      </Sidebar>
    );
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.object,
};

ReminderList.defaultProps = {
  reminders: {},
};
