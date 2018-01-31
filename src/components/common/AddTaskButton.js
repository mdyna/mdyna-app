import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';

const testTodo =
  {
    title: 'Another task',
    text: ' enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    color: '#69f0ae',
  };

export default class AddTaskButton extends Component {
  render() {
    return (
      <Button
        onClick={() => {
          this.props.addTask(testTodo);
        }}
        className="add-task-btn"
      >
        <Pulse />
      </Button>
    );
  }
}

AddTaskButton.propTypes = {
  addTask: PropTypes.func.isRequired,
};
