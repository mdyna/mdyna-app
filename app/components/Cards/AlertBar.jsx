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
    const { completeCard, card, snoozeCard, failCard, showNotificationIcon } = this.props;
    return (
      <div className="alert-actions">
        {showNotificationIcon ? <NotificationIcon className="notification-icon" /> : ''}
        <Button onClick={() => completeCard(card)}>
          <CheckmarkIcon className="complete-task-icon" />
        </Button>
        <Button onClick={() => snoozeCard(card)}>
          <AlarmIcon className="snooze-task-icon" />
        </Button>
        <Button onClick={() => failCard(card)}>
          <CloseIcon className="fail-task-icon" />
        </Button>
      </div>
    );
  }
}

export default AlertBar;

AlertBar.propTypes = {
  completeCard: PropTypes.func.isRequired,
  showNotificationIcon: PropTypes.bool.isRequired,
  snoozeCard: PropTypes.func.isRequired,
  failCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
