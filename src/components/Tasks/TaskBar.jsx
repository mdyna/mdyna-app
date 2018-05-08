import React, { Component } from 'react';
import Share from 'grommet/components/icons/base/Share';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import CloseIcon from 'grommet/components/icons/base/Close';
import EditIcon from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

import '!style-loader!css-loader!sass-loader!./TaskBar.scss'; // eslint-disable-line
import { assertTaskChanges } from './TaskItem';


const REMOVE_TASK_ENDPOINT = `${window.serverHost}/removeTask/`;
const ADD_TASK_ENDPOINT = `${window.serverHost}/addTask/`;

class TaskBar extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.task && this.props.task) {
      return assertTaskChanges(nextProps.task, this.props.task);
    }
    return false;
  }

  getTaskShortLink(task) {
    if (!task.shortLink) {
      fetch(ADD_TASK_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then(data => data.json())
        .then((res) => {
          const responseKeys = {
            taskId: res.task_id,
            shortLink: res.short_link,
          };
          this.props.generateTaskLink(responseKeys, task.taskId);
        })
        .catch(error => console.log(error));
    }
  }

  removeTask(task) {
    if (task.shortLink) {
      fetch(REMOVE_TASK_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .catch(error => console.log(error));
    }
    this.props.removeTask(task);
  }

  render() {
    const { task, editTask, toggleTask } = this.props;
    return (
      <div className="task-bar" style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(task.color).darken(25)})` }}>
        <Button onClick={() => toggleTask(task)}>
          <CheckmarkIcon className={classnames({ 'checkmark-icon': true, completed: task.completed })} />
        </Button>
        <Button onClick={() => editTask(task)}>
          <EditIcon className="edit-icon" />
        </Button>
        <Button onClick={() => this.removeTask(task)}>
          <CloseIcon className="close-icon" />
        </Button>
        <div className={classnames('share-box', { sharing: task.shortLink })}>
          <Button onClick={() => this.getTaskShortLink(task)}>
            <Share className="share-icon" />
          </Button>
          <span>{task.shortLink}</span>
        </div>
      </div>
    );
  }
}

export default TaskBar;

TaskBar.propTypes = {
  task: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  generateTaskLink: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};
