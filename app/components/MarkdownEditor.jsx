import React, { Component } from 'react';
import ReactSMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '!style-loader!css-loader!sass-loader!../node_modules/simplemde/dist/simplemde.min.css'; // eslint-disable-line

class Note extends Component {
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
          renderingConfig: {
            codeSyntaxHighlighting: true,
          },
          autofocus: true,
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
            '|',
            'fullscreen',
          ],
        }}
        value={text}
        onChange={e => this.handleValueChange(e)}
      />
    );
  }
}

export default Note;

Note.propTypes = {
  text: PropTypes.string,
  settingName: PropTypes.string,
  className: PropTypes.string,
  changeNoteSetting: PropTypes.func.isRequired,
};

Note.defaultProps = {
  text: '',
  className: 'text-editor',
  settingName: 'text',
};
