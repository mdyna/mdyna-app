import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Sidebar from 'grommet/components/Sidebar';
import ReminderItem from './ReminderItem'

import '!style-loader!css-loader!sass-loader!./ReminderList.scss'; // eslint-disable-line
import unNest from '../../utils/nest';


function checkUncompletedReminders(reminderList) {
  for (let i = 0; i < reminderList.length; i += 1) {
    const reminderStats = unNest(reminderList[i], 'reminderStats');
    const startDate = unNest(reminderList[i], 'startDate');

  }
}

function renderReminderItems(reminders) {
  const reminderItems = [];
  for (let index = 0; index < reminders.length; index += 1) {
    const reminderProps = reminders[index];
    if (reminderProps) {
      reminderItems.push(
        <ReminderItem key={index} {...reminderProps} />,
      );
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

  reminderNotification() {
    const { reminders } = this.props;
    const { daily, weekly, monthly } = reminders;
  }

  render() {
    const { reminders } = this.props;
    const { daily, weekly, monthly } = reminders;
    return (
      <Sidebar className="reminder-list" size="small" full={false}>
        {this.reminderNotification()}
        <Headline align="center" size="small">
          Reminders
        </Headline>
        {
          daily.length ?
            <Section>
              <Headline align="center" size="small">
                Daily
              </Headline>
              {renderReminderItems(daily)}
            </Section> :
            ''
        }
        {
          weekly.length ?
            <Section>
              <Headline align="center" size="small">
                  Weekly
              </Headline>
              {renderReminderItems(weekly)}
            </Section> :
            ''
        }
        {
          monthly.length ?
            <Section>
              <Headline align="center" size="small">
                  Monthly
              </Headline>
              {renderReminderItems(monthly)}
            </Section> :
            ''
        }
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
