import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../../store/actions/';

const testTodo = '# hey sister';
class AddTaskButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          this.props.dispatch(addTodo(testTodo));
        }}
        className="add-task-btn"
      >
        <Pulse />
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { tasks: bindActionCreators(addTodo, dispatch) };
}
export default connect(mapDispatchToProps)(AddTaskButton);
