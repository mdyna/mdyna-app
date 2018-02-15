import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Card from 'grommet/components/Card';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';
import TaskEditor from './TaskEditor';
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
        <Card
          onClick={(e) => {
            console.log('placeholder for toggling cardss', e);
          }}
          key={i}
          className="task-item"
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
        className="task-list"
        responsive
        direction="row"
        full="horizontal"
      >
        <Headline
          align="center"
          size="medium"
        >
          TASKS
        </Headline>
        <Section
          direction="row"
          className="visible-tasks"
        >
          { this.visibleTasks() }
        </Section>
        <Button
          onClick={() => {
            this.toggleModal();
          }}
          className="add-task-btn"
        >
          <Pulse />
        </Button>
        {
          this.state.modalOpen ?
            <Layer
              overlayClose
              closer
              flush
              onClose={() => {
                this.toggleModal();
              }}
            >
              <TaskEditor
                addTask={(...args) => this.props.addTask(...args)}
              />
            </Layer> :
        ''
        }
      </Section>
    );
  }
}

TaskList.propTypes = {
  addTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

TaskList.defaultProps = {
  tasks: [],
};
