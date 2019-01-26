import React, { Component } from 'react';
import htmlescape from 'showdown-htmlescape';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import regExp from '../utils/regexp';
import ReactHighlight from './CodeHighlight';

import '!style-loader!css-loader!sass-loader!./MarkdownText.scss'; // eslint-disable-line

const COLOR_LABELS = {
  '#ff8a80': 'red',
  '#ff80ab': 'pink',
  '#ea80fc': 'purple',
  '#8c9eff': 'dark-blue',
  '#80d8ff': 'light-blue',
  '#a7ffeb': 'mdyna-green',
  '#b9f6ca': 'green',
  '#fff475': 'yellow',
  '#ffd180': 'orange',
  '#a7c0cd': 'grey',
};

class TaskListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    const { text, editCard, otherProps } = this.props;
    console.log(editCard, this.props);

    return (
      <input
        className="card-tasklist"
        type="checkbox"
        defaultChecked
        onClick={(e) => {
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
              (text.indexOf(`[x]${inputTextContent} `) !== -1 && `[x]${inputTextContent}`) ||
              null;
            newText = text.replace(inputText, `[ ] ${inputTextContent}`);
          }
          saveFunc({
            ...card,
            text: newText,
          });
        }}
      />
    );
  }
}

export default TaskListInput;

TaskListInput.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string.isRequired,
  minimized: PropTypes.bool,
  whiteMode: PropTypes.bool,
  color: PropTypes.string,
};

TaskListInput.defaultProps = {
  minimized: false,
  whiteMode: false,
  color: '#4E636E',
  text: '',
};
