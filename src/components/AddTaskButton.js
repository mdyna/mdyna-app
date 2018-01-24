import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';

class AddTaskButton extends Component {
  render() {
    return (

      <Button
        className="add-task-btn"
      >
        <Pulse />
      </Button>
    );
  }
}

export default AddTaskButton;
