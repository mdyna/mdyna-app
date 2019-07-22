import React, { PureComponent } from 'react';
import ReactSMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import snakeCase from 'lodash/snakeCase';

import '!style-loader!css-loader!sass-loader!../../node_modules/simplemde/dist/simplemde.min.css'; // eslint-disable-line

function getInstance(editor, submitCard) {
  // eslint-disable-next-line no-param-reassign
  editor.codemirror.options.extraKeys['Ctrl-Enter'] = () => submitCard();
}

class MarkdownEditor extends PureComponent {
  state = {
    editorText: null,
  };

  handleValueChange(value) {
    const { changeNoteSetting, settingName } = this.props;
    const { editorText } = this.state;
    if ((value || value === '') && value !== editorText) {
      changeNoteSetting(snakeCase(settingName), value);
      this.setState({ editorText: value });
    }
  }

  render() {
    const { className, text, submitCard } = this.props;
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
        }}
        value={text}
        getMdeInstance={instance => getInstance(instance, submitCard)}
        onChange={e => this.handleValueChange(e)}
      />
    );
  }
}

export default MarkdownEditor;

MarkdownEditor.propTypes = {
  text: PropTypes.string,
  submitCard: PropTypes.func.isRequired,
  settingName: PropTypes.string,
  className: PropTypes.string,
  changeNoteSetting: PropTypes.func.isRequired,
};

MarkdownEditor.defaultProps = {
  text: '',
  className: 'text-editor',
  settingName: 'text',
};
