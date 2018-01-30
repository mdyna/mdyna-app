import React, { Component } from 'react';
import { connect } from 'react-redux';

class VisibleTasks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="cotainer">
        <div className="notification">
          <h1>
            {this.props && this.props.tasks && this.props.tasks[0].text || 'heya'}
          </h1>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}
export default connect(mapStateToProps)(VisibleTasks);
