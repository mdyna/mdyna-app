import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Headline from 'grommet/components/Headline';
import Section from 'grommet/components/Section';
import Sidebar from 'grommet/components/Sidebar';
import _ from 'lodash';
import classnames from 'classnames';
import TaskItem from '../../containers/TaskItem';

import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

function renderTaskItems(tasks) {
  const taskItems = [];
  for (let index = 0; index < tasks.length; index += 1) {
    const taskProps = tasks[index];
    if (taskProps) {
      taskItems.push(<TaskItem key={index} task={taskProps} />);
    }
  }
  return taskItems;
}
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
    };
  }

  renderTaskSection() {
    const { tasks } = this.props;
    const taskTypes = Object.keys(tasks);
    const taskSections = [];
    let count = 0;
    taskTypes.forEach((tasksType) => {
      const scheduledTasks = tasks[tasksType];
      if (scheduledTasks.length) {
        taskSections.push(
          <Section key={count}>
            <Headline align="center" size="small">
              {_.capitalize(tasksType)}
            </Headline>
            {renderTaskItems(scheduledTasks)}
          </Section>,
        );
      }
      count += 1;
    });
    return taskSections;
  }

  render() {
    return (
      <Sidebar
        className={classnames('task-list', { 'white-mode': this.props.whiteMode })}
        size="small"
        full={false}
      >
        <Headline align="center" size="small">
          TASKS
        </Headline>
        {this.renderTaskSection()}
      </Sidebar>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.object,
  whiteMode: PropTypes.bool,
};

TaskList.defaultProps = {
  tasks: {},
  whiteMode: false,
};
