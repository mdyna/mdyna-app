import React from 'react';
import cx from 'classnames';
import AutoReplace from 'slate-plugins/packages/@axioscode/slate-auto-replace/lib/slate-auto-replace';
import PropTypes from 'prop-types';
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
  return newValue !== value ? newValue : null;
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
        plugins={[
          AutoReplace({
            trigger: 'space',
            before: /:\w+:/gi,
            change: (changes, e, matches) => {
              const rawEmoji = matches && matches.before && matches.before[0];
              const emojiString = rawEmoji.split(':')[1];
              if (emojiString) {
                changes.moveFocusBackward(rawEmoji.length); // select last word
                changes.insertText(parseEmojis(rawEmoji));
              }
            },
          }),
        ]}
        onChange={val => this.handleChange(val)}
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
