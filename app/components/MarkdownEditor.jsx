import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import InstantReplace from 'slate-instant-replace';
import { toArray } from 'react-emoji-render';
import emoji from 'emoji-dictionary';
import Editor from 'rich-markdown-editor';
import MarkdownSerializer from 'slate-md-serializer';
import { getPalette } from '../themes/themeBuilder';
import { getCodeTheme, getEditorTheme } from './MarkdownEditorThemes';

const parseEmojis = (value) => {
  const emojisArray = toArray(value);
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === 'string') return previous + current;
    return previous + current.props.children;
  }, '');
  return newValue;
};

// Transformation function
const AddEmojis = (editor, lastWord) => {
  editor.moveFocusBackward(lastWord.length); // select last word
  editor.insertText(parseEmojis(lastWord)); // replace it
};

const Markdown = new MarkdownSerializer();
class MarkdownEditor extends React.PureComponent {
  editorRef = React.createRef();

  componentDidUpdate(prevProps) {
    const { value, readOnly } = this.props;
    if (value !== prevProps.value && readOnly) {
      this.editorRef.current.setState({
        editorValue: Markdown.deserialize(value),
      });
    }
  }

  emojiSupport = text => text.replace(/:\w+:/gi, name => (name && emoji.getUnicode(name)) || name);

  handleChange = (value) => {
    const { onChange, changeTitle, card } = this.props;

    const rawValue = this.emojiSupport(value());
    if (onChange && rawValue) {
      const { title, text } = card;
      const rawValueTitle = rawValue && rawValue.match(new RegExp(/^(.*)$/m))[0];
      const handledValue = rawValue && rawValue.replace(rawValueTitle, '');
      const handledTitle = rawValueTitle && rawValueTitle.replace('# ', '');
      if (handledTitle && handledTitle !== title) {
        changeTitle(handledTitle);
      }
      if (handledValue && String(handledValue).trim() !== text) {
        onChange(String(handledValue).trim());
      }
    }
  };

  render() {
    const {
      value,
      readOnly,
      onSave,
      className,
      card,
      codeTheme = 'DRA',
      whiteMode,
    } = this.props;

    const plugins = [InstantReplace(AddEmojis)];
    const palette = getPalette(whiteMode);
    const editorTheme = getEditorTheme(palette);
    return (
      <Editor
        ref={this.editorRef}
        className={cx(className, 'mdyna-md', 'card-content')}
        readOnly={readOnly}
        autoFocus={!readOnly}
        defaultValue={this.emojiSupport(value)}
        onSave={() => onSave(card)}
        plugins={plugins}
        onChange={val => this.handleChange(val)}
        onSearchLink={async (term) => {
          console.log('Searched link: ', term);
          return [
            {
              title: term,
              url: 'localhost',
            },
          ];
        }}
        theme={{
          ...editorTheme,
          ...getCodeTheme(codeTheme),
        }}
      />
    );
  }
}

export default MarkdownEditor;

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  changeTitle: PropTypes.func,
  card: PropTypes.object,
  onSave: PropTypes.func,
  className: PropTypes.string,
  codeTheme: PropTypes.string,
  whiteMode: PropTypes.bool,
  readOnly: PropTypes.bool,
};

MarkdownEditor.defaultProps = {
  value: '',
  onChange: null,
  changeTitle: null,
  onSave: null,
  className: '',
  codeTheme: '',
  readOnly: true,
  whiteMode: false,
  card: {},
};
