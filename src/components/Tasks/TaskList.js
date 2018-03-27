import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';
import TaskEditor from '../../containers/TaskEditor';
import TaskItem from './TaskItem';

import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: this.props.tasks,
      modalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tasks: newProps.tasks,
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  visibleTasks() {
    const tasks = [];
    for (let i = 0; i < this.state.tasks.length; i += 1) {
      const task = this.state.tasks[i];
      tasks.push(
        <TaskItem
          task={task}
          key={i}
        />,
      );
    }
    return tasks;
  }

  render() {
    return (
      <Section className="task-list" responsive direction="row" full="horizontal">
        <Headline align="center" size="medium">
          TASKS
        </Headline>
        <Section direction="row" className="visible-tasks">
          {this.visibleTasks()}
        </Section>
        <Button
          onClick={() => {
            this.toggleModal();
          }}
          className="add-task-btn"
        >
          <Pulse />
        </Button>
        {this.state.modalOpen ? (
          <Layer
            overlayClose
            closer
            flush
            onClose={() => {
              this.toggleModal();
            }}
            className="task-layer"
          >
            <TaskEditor addTask={(...args) => this.props.addTask(...args)} />
          </Layer>
        ) : (
          ''
        )}
      </Section>
    );
  }
}

TaskList.propTypes = {
  addTask: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};

TaskList.defaultProps = {
  tasks: [],
};
