import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

class TaskPreview extends Component {
  render() {
    const { task } = this.props;
    return (
      <TaskItem
        className="task-preview"
        task={task}
      />
    );
  }
}

export default TaskPreview;

TaskPreview.propTypes = {
  task: PropTypes.object,
};

TaskPreview.defaultProps = {
  task: {},
};
