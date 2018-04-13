import React, { Component } from 'react';
import Card from 'grommet/components/Card';
import InheritIcon from 'grommet/components/icons/base/Inherit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';

import '!style-loader!css-loader!sass-loader!./TaskItem.scss'; // eslint-disable-line

class Task extends Component {

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    if (nextProps.task && this.props.task) {
      return (nextProps.task.shortLink !== this.props.task.shortLink);
    }
    return false;
  }

  render() {
    const { task, i, className } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      extensions: [htmlescape],
    });
    const taskText = (task && task.text && converter.convert(task.text)) || '';
    return (
      <Card
        key={i}
        className={classnames(className, 'task-item')}
        heading={(task && task.title) || ''}
        style={{
          backgroundColor: (task && task.color) || '#4e636e',
        }}
      >
        <Button
          onClick={() =>
            fetch('http://localhost:7000/addTask/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(task),
            })
            .then(data => data.json())
            .then((res) => {
              const responseKeys = {
                taskId: res.task_id,
                shortLink: res.short_link,
              };
              this.props.generateTaskLink(responseKeys, task.taskId);
            })
            .catch(error => console.log(error))
          }
        >
          <InheritIcon />
          { this.props.task.shortLink }
        </Button>
        <div className="task-card-content">{taskText}</div>
      </Card>
    );
  }
}

export default Task;

Task.propTypes = {
  task: PropTypes.object.isRequired,
  className: PropTypes.string,
  generateTaskLink: PropTypes.func.isRequired,
  i: PropTypes.number,
};

Task.defaultProps = {
  i: 0,
  className: '',
};
