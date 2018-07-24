import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Sidebar from 'grommet/components/Sidebar';
import _ from 'lodash';
import classnames from 'classnames';
import ReminderItem from '../../containers/ReminderItem';

import '!style-loader!css-loader!sass-loader!./ReminderList.scss'; // eslint-disable-line

function renderReminderItems(reminders) {
  const reminderItems = [];
  for (let index = 0; index < reminders.length; index += 1) {
    const reminderProps = reminders[index];
    if (reminderProps) {
      reminderItems.push(<ReminderItem key={index} reminder={reminderProps} />);
    }
  }
  return reminderItems;
}
export default class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: this.props.reminders,
    };
  }

  renderReminderSection() {
    const { reminders } = this.props;
    const reminderTypes = Object.keys(reminders);
    const reminderSections = [];
    let count = 0;
    reminderTypes.forEach((remindersType) => {
      const scheduledReminders = reminders[remindersType];
      if (scheduledReminders.length) {
        reminderSections.push(
          <Section key={count}>
            <Headline align="center" size="small">
              {_.capitalize(remindersType)}
            </Headline>
            {renderReminderItems(scheduledReminders)}
          </Section>,
        );
      }
      count += 1;
    });
    return reminderSections;
  }

  render() {
    return (
      <Sidebar
        className={classnames('reminder-list', { 'white-mode': this.props.whiteMode })}
        size="small"
        full={false}
      >
        <Headline align="center" size="small">
          REMINDERS
        </Headline>
        {this.renderReminderSection()}
      </Sidebar>
    );
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.object,
  whiteMode: PropTypes.bool,
};

ReminderList.defaultProps = {
  reminders: {},
  whiteMode: false,
};
