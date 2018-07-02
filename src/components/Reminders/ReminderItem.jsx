import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';


import '!style-loader!css-loader!sass-loader!./ReminderList.scss'; // eslint-disable-line

export default class ReminderItem extends Component {
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
    const { color } = this.props;
    return (
      <Card
        className={'reminder-item'}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color || '#4e636e',
        }}
      >

      </Card>
    );
  }
}

ReminderItem.propTypes = {
  color: PropTypes.string.isRequired,
};
