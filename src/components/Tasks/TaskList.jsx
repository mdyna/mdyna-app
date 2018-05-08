import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/base/Add';
import TaskEditor from '../../containers/TaskEditor';
import TaskItem from '../../containers/TaskItem';

import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

export default class TaskList extends Component {
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
        <TaskItem
          hasTaskBar
          task={task}
          key={i}
        />,
      );
    }
    return tasks.reverse();
  }

  render() {
    return (
      <Section className="task-list" responsive direction="row" full="horizontal">
        <Headline align="center" size="medium">
          TASKS
        </Headline>
        {
          this.state.tasks.length ?
            <Columns
              masonry
              responsive
              maxCount={3}
              justify={'center'}
              className="visible-tasks"
            >
              {this.visibleTasks()}
            </Columns> :
            <Heading align="center" tag="h3">
              Click to add new task
            </Heading>

        }
        <Button
          onClick={() => {
            this.props.toggleEditor();
          }}
          className="add-task-btn"
        >
          <Pulse />
        </Button>
        {this.props.modalOpen ? (
          <Layer
            overlayClose
            closer
            flush
            onClose={() => this.props.toggleEditor()}
            className="task-layer"
          >
            <TaskEditor
              toggleEditor={this.props.toggleEditor}
            />
          </Layer>
        ) : (
          ''
        )}
      </Section>
    );
  }
}

TaskList.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  tasks: PropTypes.array,
};

TaskList.defaultProps = {
  modalOpen: false,
  tasks: [],
};
