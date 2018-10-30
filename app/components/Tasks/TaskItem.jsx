import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import classnames from 'classnames';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Toast from 'grommet/components/Toast';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import MarkdownText from '../MarkdownText';

import '!style-loader!css-loader!sass-loader!./TaskItem.scss'; // eslint-disable-line
import unNest from '../../utils/nest';
import toMilliSeconds from '../../utils/time';
import TaskBar from './TaskBar';

const ALERT_TIMES = {
  daily: toMilliSeconds.day,
  weekly: toMilliSeconds.week,
  monthly: toMilliSeconds.month,
};

function minimizeTask(task) {
  task.setState({
    minimized: (task && task.state && !task.state.minimized) || false,
  });
}

function buildTaskSeries(taskStats) {
  // const getRandomColor = () => `hsl(${Math.floor((Math.random() * 360) + 1)}, 70%, 70%)`;
  const { completed, failed, snooze } = taskStats;
  return [
    {
      label: 'Completed',
      value: completed || 0,
      colorIndex: 'accent-1',
    },
    {
      label: 'Failed',
      value: failed || 0,
      colorIndex: 'accent-2',
    },
    {
      label: 'Snoozed',
      value: snooze || 0,
      colorIndex: 'neutral-2',
    },
  ];
}
export function taskNeedsAlert(lastAlert, frequency) {
  const currentDate = new Date().getTime();
  const taskAlertTime = ALERT_TIMES[frequency];
  if (lastAlert) {
    const needsAlert = currentDate - new Date(lastAlert).getTime() > taskAlertTime;
    return needsAlert;
  }
  return true;
}
export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
    };
  }

  getTaskStats() {
    const { task } = this.props;
    const { taskStats } = task;
    return {
      completed: (taskStats && taskStats.completed) || 0,
      failed: (taskStats && taskStats.failed) || 0,
      snooze: (taskStats && taskStats.snooze) || 0,
      consecutive: (taskStats && taskStats.consecutive) || 0,
      record: (taskStats && taskStats.record) || 0,
      ...taskStats,
    };
  }

  toastNotification() {
    const { task, snoozeTask, failTask, completeTask } = this.props;
    const { taskFrequency, taskStats } = task;
    const { lastAlertDate } = taskStats;
    if (taskNeedsAlert(lastAlertDate, taskFrequency)) {
      return (
        <Toast status="warning" style={{ color: '#64ffda', backgroundColor: 'rgba(5,7,9, 0.7)' }}>
          {task.title} needs to confirmed
          {TaskBar.alertBar(completeTask, task, snoozeTask, failTask, false)}
        </Toast>
      );
    }
    return '';
  }

  render() {
    const color = unNest(this, 'props.task.color') || '#1DE9B6';
    const { task, removeTask, editTask, snoozeTask, failTask, completeTask } = this.props;
    const stats = this.getTaskStats();
    const taskActions = {
      removeTask,
      editTask,
      snoozeTask,
      failTask,
      completeTask,
    };
    const series = buildTaskSeries(stats);
    const max = series.reduce((a, b) => a + b.value, 0);

    const fontColor = tinycolor(color).darken(50);
    return (
      <Card
        className={classnames('task-item', {
          minimized: this.state.minimized,
        })}
        style={{
          filter: `drop-shadow(2px -4px 2px ${tinycolor(color).darken(25)})`,
          backgroundColor: color,
          color: fontColor,
        }}
      >
        {this.toastNotification()}
        <TaskBar
          taskActions={taskActions}
          task={task}
          minimizeTask={minimizeTask}
          taskItem={this}
          minimized={this.state.minimized}
        />
        <Heading align="start" tag="h3" strong>
          {task.title}
        </Heading>
        <div className="labels">
          {task && task.labels
            ? task.labels.map(label => (
              <span
                style={{
                  backgroundColor: tinycolor(color).lighten(10),
                  border: `3px solid ${tinycolor(color).darken(30)}`,
                  borderRadius: '50px',
                  padding: '5px',
                }}
                key={`label-${label.title}`}
              >
                {label.title}
              </span>
            ))
            : ''}
        </div>
        <div
          className="task-chart"
          style={{
            color: fontColor,
          }}
        >
          {this.state.minimized ? '' : (
            <AnnotatedMeter
              type="circle"
              size="small"
              series={series}
              legend
              max={max}
              className="task-chart"
            />
          )}
        </div>
        <MarkdownText
          className="task-text"
          minimized={this.state.minimized}
          color={color}
          text={task.text}
        />
      </Card>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  snoozeTask: PropTypes.func.isRequired,
  failTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
};
