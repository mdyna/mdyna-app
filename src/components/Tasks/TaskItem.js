import React, { Component } from 'react';
import Card from 'grommet/components/Card';
import InheritIcon from 'grommet/components/icons/base/Inherit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';
import generateShortLink from '../../server/';

import '!style-loader!css-loader!sass-loader!./TaskItem.scss'; // eslint-disable-line

class Task extends Component {
  render() {
    const { task, i, className } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      extensions: [htmlescape],
    });
    const taskText = converter.convert(task.text);
    return (
      <Card
        key={i}
        className={classnames(className, 'task-item')}
        heading={task.title}
        style={{
          backgroundColor: task.color || '#4e636e',
        }}
      >
        <Button
          onClick={() => generateShortLink(task)}
        >
          <InheritIcon />
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
  i: PropTypes.number,
};

Task.defaultProps = {
  i: 0,
  className: '',
};
