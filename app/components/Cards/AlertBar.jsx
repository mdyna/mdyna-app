import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationIcon from 'grommet/components/icons/base/Notification';
import AlarmIcon from 'grommet/components/icons/base/Alarm';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import Button from 'grommet/components/Button';

import '!style-loader!css-loader!sass-loader!./AlertBar.scss'; // eslint-disable-line

class AlertBar extends Component {
  render() {
    const { completeTask, task, snoozeTask, failTask, showNotificationIcon } = this.props;
    return (
      <div className="alert-actions">
        {showNotificationIcon ? <NotificationIcon className="notification-icon" /> : ''}
        <Button onClick={() => completeTask(task)}>
          <CheckmarkIcon className="complete-task-icon" />
        </Button>
        <Button onClick={() => snoozeTask(task)}>
          <AlarmIcon className="snooze-task-icon" />
        </Button>
        <Button onClick={() => failTask(task)}>
          <CloseIcon className="fail-task-icon" />
        </Button>
      </div>
    );
  }
}

export default AlertBar;

AlertBar.propTypes = {
  completeTask: PropTypes.func.isRequired,
  showNotificationIcon: PropTypes.bool.isRequired,
  snoozeTask: PropTypes.func.isRequired,
  failTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};
