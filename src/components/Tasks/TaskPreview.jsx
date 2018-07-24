import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

class TaskPreview extends Component {
  render() {
    const { task, changeTaskSetting } = this.props;
    return <TaskItem className="task-preview" changeTaskSetting={changeTaskSetting} task={task} />;
  }
}

export default TaskPreview;

TaskPreview.propTypes = {
  task: PropTypes.object,
  changeTaskSetting: PropTypes.func.isRequired,
};

TaskPreview.defaultProps = {
  task: {},
};
