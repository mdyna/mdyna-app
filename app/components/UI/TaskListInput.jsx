import React, { Component } from 'react';
import regexp from 'Utils/regexp';
import PropTypes from 'prop-types';

const FORBIDDEN_CHARACTERS = ['#', '*', '´', '~', '`'];

function dropMdChars(text) {
  const textArray = [];
  const isNotForbidden = char => FORBIDDEN_CHARACTERS.indexOf(char) === -1;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (isNotForbidden(char)) {
      textArray.push(char);
    }
  }
  return textArray.join('');
}

function getTaskDataFromInput(text) {
  const taskData = {
    tasks: [],
    completed: 0,
  };
  const tasks = text.match(regexp.extractTasksFromMarkdownRegExp)[0].split('- ');
  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    if (task) {
      const rawContent = task.slice(4, task.length - 1).trim();
      const completed = (task.slice(0, 3) === '[X]' && true) || false;
      const textContent = dropMdChars(rawContent).trim();
      taskData.tasks.push({
        rawContent,
        completed,
        textContent,
      });
      if (completed) {
        taskData.completed += 1;
      }
    }
  }
  return taskData;
}

class TaskListInput extends Component {
  render() {
    const {
      text, editCard, defaultChecked,
    } = this.props;

    return (
      <React.Fragment>
        <input
          className="card-tasklist"
          type="checkbox"
          checked={defaultChecked === 'true'}
          onChange={(e) => {
            e.stopPropagation();
            const { card, saveFunc } = editCard;
            const taskData = getTaskDataFromInput(text);
            let newText = '';
            const taskIndex = taskData.tasks
              .map(t => t.textContent)
              .indexOf(e.target.parentElement.textContent.trim());
            if (taskIndex !== -1) {
              const task = taskData.tasks[taskIndex];
              const { rawContent, completed } = task;
              const newRawContent = completed ? `[ ] ${rawContent}` : `[X] ${rawContent}`;
              const targetContent = completed ? `[X] ${rawContent}` : `[ ] ${rawContent}`;
              newText = text.replace(targetContent, newRawContent);
            }
            saveFunc({
              ...card,
              text: newText,
            });
          }}
        />
      </React.Fragment>
    );
  }
}

export default TaskListInput;

TaskListInput.propTypes = {
  text: PropTypes.string,
  defaultChecked: PropTypes.string,
  editCard: PropTypes.object.isRequired,
};

TaskListInput.defaultProps = {
  text: '',
  defaultChecked: 'false',
};
