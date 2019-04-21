import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskListInput extends Component {

  render() {
    const { text, editCard, defaultChecked } = this.props;

    return (
      <React.Fragment>
        <input
          className="card-tasklist"
          type="checkbox"
          checked={defaultChecked === 'true'}
          onChange={(e) => {
            e.stopPropagation();
            const { card, saveFunc } = editCard;
            const inputTextContent = e.target.parentElement.textContent;
            let newText = '';
            if (e.target.checked) {
              const inputText = `[ ]${inputTextContent}`;
              newText = text.replace(inputText, `[X]${inputTextContent}`);
            } else {
              const inputText =
                (text.indexOf(`[X]${inputTextContent}`) !== -1 && `[X]${inputTextContent}`) ||
                (text.indexOf(`[x]${inputTextContent}`) !== -1 && `[x]${inputTextContent}`) ||
                null;
              newText = text.replace(inputText, `[ ] ${inputTextContent}`);
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
