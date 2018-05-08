import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';
import TaskBar from './TaskBar';
import '!style-loader!css-loader!sass-loader!./TaskItem.scss'; // eslint-disable-line

export function assertTaskChanges(newTask, oldTask) {
  const taskProps = Object.keys(newTask);
  for (let i = 0; i < taskProps.length; i += 1) {
    const setting = taskProps[i];
    if (!oldTask[setting] || oldTask[setting] !== newTask[setting]) {
      return true;
    }
  }
  return false;
}
class Task extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.task && this.props.task) {
      return assertTaskChanges(nextProps.task, this.props.task);
    }
    return false;
  }

  render() {
    const { task, i, className, hasTaskBar } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      extensions: [htmlescape],
    });
    const taskText = (task && task.text && converter.convert(task.text)) || '';
    return (
      <Card
        key={i}
        className={classnames(className, 'task-item')}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(task.color).darken(25)})`,
          backgroundColor: (task && task.color) || '#4e636e',
        }}
      >
        {
          hasTaskBar ?
            <TaskBar
              task={task}
              generateTaskLink={this.props.generateTaskLink}
              toggleTask={this.props.toggleTask}
              removeTask={this.props.removeTask}
              editTask={this.props.editTask}
            /> :
            ''
        }
        <Heading
          align="start"
          size="small"
          strong
        >
          {task.title}
        </Heading>
        <div className="task-card-content">{taskText}</div>
      </Card>
    );
  }
}

export default Task;

Task.propTypes = {
  task: PropTypes.object.isRequired,
  hasTaskBar: PropTypes.bool,
  editTask: PropTypes.func,
  className: PropTypes.string,
  removeTask: PropTypes.func,
  toggleTask: PropTypes.func,
  generateTaskLink: PropTypes.func,
  i: PropTypes.number,
};

Task.defaultProps = {
  i: 0,
  removeTask: null,
  editTask: null,
  toggleTask: null,
  generateTaskLink: null,
  hasTaskBar: false,
  className: '',
};
