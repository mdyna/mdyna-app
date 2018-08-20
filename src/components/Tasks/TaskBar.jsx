import React, { Component } from 'react';
import NotificationIcon from 'grommet/components/icons/base/Notification';
import AlarmIcon from 'grommet/components/icons/base/Alarm';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import MinimizeIcon from 'grommet/components/icons/base/Up';
import MaximizeIcon from 'grommet/components/icons/base/Down';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

import '!style-loader!css-loader!sass-loader!./TaskBar.scss'; // eslint-disable-line
import { taskNeedsAlert } from './TaskItem';
import unNest from '../../utils/nest';

class TaskBar extends Component {

  static alertBar(completeTask, task, snoozeTask, failTask, showNotificationIcon) {
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


  render() {
    const { taskActions, task } = this.props;
    const { removeTask, editTask, snoozeTask, failTask, completeTask } = taskActions;
    const { taskFrequency } = task;
    const lastAlertDate = unNest(task, 'taskStats.lastAlertDate') || null;
    console.log('rendering', this)
    return (
      <div
        className="task-bar"
        style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(task.color).darken(25)})` }}
      >
        <div className="general-actions">
          <Button
            onClick={() => editTask({ ...task, repeat: true, taskFrequency: task.taskFrequency })}
          >
            <EditIcon className="edit-icon" />
          </Button>
          <Button onClick={() => removeTask(task)}>
            <TrashIcon className="close-icon" />
          </Button>
          {this.props.minimized ? (
            <Button onClick={() => this.props.minimizeTask(this.props.taskItem)}>
              <MaximizeIcon className="maximize-icon" />
            </Button>
          ) : (
            <Button onClick={() => this.props.minimizeTask(this.props.taskItem)}>
              <MinimizeIcon className="minimize-icon" />
            </Button>
          )}
        </div>
        {taskNeedsAlert(lastAlertDate, taskFrequency)
          ? TaskBar.alertBar(completeTask, task, snoozeTask, failTask, true)
          : ''}
      </div>
    );
  }
}

export default TaskBar;

TaskBar.propTypes = {
  taskActions: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  minimizeTask: PropTypes.func.isRequired,
  taskItem: PropTypes.object.isRequired,
  minimized: PropTypes.bool,
};

TaskBar.defaultProps = {
  minimized: false,
};
