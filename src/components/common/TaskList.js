import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Card from 'grommet/components/Card';
import AddTaskButton from './AddTaskButton';
import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tasks: newProps.tasks,
    });
  }
  visibleTasks() {
    const tasks = [];
    for (let i = 0; i < this.state.tasks.length; i += 1) {
      const task = this.state.tasks[i];
      tasks.push(
        <Card
          onClick={() => {
            console.log(this);
          }}
          key={i}
          heading={task.title}
          style={{
            backgroundColor: task.color,
          }}
        >
          <div className="task-card-content">
            {task.text}
          </div>
        </Card>,

      );
    }
    return tasks;
  }

  render() {
    return (
      <Section
        className="todo-list"
        responsive
      >
        <Headline
          size="small"
        >
          Task list
        </Headline>
        { this.visibleTasks() }
        <AddTaskButton
          addTask={this.props.addTask}
        />
      </Section>
    );
  }
}

TodoList.propTypes = {
  addTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};
TodoList.defaultProps = {
  tasks: [],
};
