import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';

const testTodo = '# hey sister';
export default class AddTaskButton extends Component {
  render() {
    return (
      <Button
        onClick={(e) => {
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
