import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Sidebar from 'grommet/components/Sidebar';
import Toast from 'grommet/components/Toast';

import '!style-loader!css-loader!sass-loader!./ReminderList.scss'; // eslint-disable-line

export default class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: this.props.reminders,
    };
  }

  render() {
    return (
      <Sidebar className="reminder-list" fixed size="small" full={false}>
        <Headline align="center" size="small">
          Reminders
        </Headline>
        <Toast status="critical">
          A short message to let the user know something.
        </Toast>
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
