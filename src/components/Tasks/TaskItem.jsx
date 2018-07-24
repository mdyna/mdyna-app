import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';
import _ from 'lodash';
import TaskBar from './TaskBar';
import '!style-loader!css-loader!sass-loader!./TaskItem.scss'; // eslint-disable-line

const COLOR_SAMPLES = [
  '#9FA8DA',
  '#0D47A1',
  'rgb(78, 99, 110)',
  '#64ffda',
  '#4CAF50',
  '#B2FF59',
  '#FFEB3B',
  '#FF7043',
  '#F44336',
  '#F48FB',
];

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
    const rawText = task && task.text;
    const color =
      (task && task.color) || this.props.changeTaskSetting('color', _.sample(COLOR_SAMPLES));
    const taskText = converter.convert(rawText) || '';
    return (
      <Card
        key={i}
        className={classnames(className, 'task-item')}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color || '#4e636e',
        }}
      >
        {hasTaskBar ? (
          <TaskBar
            task={task}
            generateTaskLink={this.props.generateTaskLink}
            toggleTask={this.props.toggleTask}
            removeTask={this.props.removeTask}
            editTask={this.props.editTask}
          />
        ) : (
          ''
        )}
        <Heading align="start" tag="h1" strong>
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
  changeTaskSetting: PropTypes.func.isRequired,
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
