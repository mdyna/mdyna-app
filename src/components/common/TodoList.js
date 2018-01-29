import React, { Component } from 'react';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import VisibleTasks from '../../containers/visibleTasks';

import '!style-loader!css-loader!sass-loader!./TodoList.scss'; // eslint-disable-line

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
      </Section>
    );
  }
}

