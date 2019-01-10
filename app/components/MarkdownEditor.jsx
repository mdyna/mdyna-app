import React, { Component } from 'react';
import ReactSMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '!style-loader!css-loader!sass-loader!../node_modules/simplemde/dist/simplemde.min.css'; // eslint-disable-line

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.editorText !== this.state.editorText;
  }

  handleValueChange(value) {
    const { changeNoteSetting, settingName } = this.props;
    if (value && value !== this.state.editorText) {
      changeNoteSetting(_.snakeCase(settingName), value);
      this.setState({ editorText: value });
    }
  }

  render() {
    const { className, text } = this.props;
    return (
      <ReactSMDE
        className={className}
        options={{
          spellChecker: false,
          toolbar: [
            'bold',
            'italic',
            'strikethrough',
            '|',
            'heading-1',
            'heading-2',
            'heading-3',
            '|',
            'code',
            'quote',
            'link',
            'image',
            'table',
            '|',
            'unordered-list',
            'ordered-list',
            {
              name: 'taskList',
              action: (editor) => {
                const cm = editor.codemirror;
                const cursorPosition = cm.getCursor();
                cm.replaceSelection('- [ ] ');
                cm.focus();
                cm.setCursor({ ...cursorPosition, ch: cursorPosition.ch + 6 });
              },
              className: 'fa fa-tasks',
              title: 'Tasks',
            },
          ],
          shortcuts: {
            toggleSideBySide: null,
            fullscreen: null,
          },
        }}
        value={text}
        onChange={e => this.handleValueChange(e)}
      />
    );
  }
}

export default MarkdownEditor;

MarkdownEditor.propTypes = {
  text: PropTypes.string,
  settingName: PropTypes.string,
  className: PropTypes.string,
  changeNoteSetting: PropTypes.func.isRequired,
};

MarkdownEditor.defaultProps = {
  text: '',
  className: 'text-editor',
  settingName: 'text',
};
