import React, { Component } from 'react';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import AddTaskButton from '../../containers/AddTaskButton';
import VisibleTasks from '../../containers/VisibleTasks';

import '!style-loader!css-loader!sass-loader!./TaskList.scss'; // eslint-disable-line

export default class TodoList extends Component {
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
        <VisibleTasks />
        <AddTaskButton />
      </Section>
    );
  }
}

