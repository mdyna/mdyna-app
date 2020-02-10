import React from 'react';
import cx from 'classnames';
import AutoReplace from 'slate-plugins/packages/@axioscode/slate-auto-replace/lib/slate-auto-replace';
import PropTypes from 'prop-types';
import { toArray } from 'react-emoji-render';
import emoji from 'emoji-dictionary';
import Editor from 'rich-markdown-editor';
import ImgurService from 'Utils/imgurService';
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

class MarkdownEditor extends React.PureComponent {
  static async uploadImg(img) {
    const link = await ImgurService.uploadFile(img);
    return link;
  }

  editorRef = React.createRef();

  emojiSupport = text => text.replace(/:\w+:/gi, name => (name && emoji.getUnicode(name)) || name);

  handleChange = (value) => {
    const { onChange, changeTitle, card } = this.props;
    const rawValue = this.emojiSupport(value());
    if (onChange && rawValue) {
      const { isEditing, editingTitle, editingText } = card;
      const title = isEditing ? editingTitle : card.title;
      const text = isEditing ? editingText : card.text;
      const rawValueTitle = rawValue && rawValue.match(new RegExp(/^(.*)$/m))[0];
      const handledValue = rawValue && rawValue.replace(rawValueTitle, '');
      const handledTitle = rawValueTitle && rawValueTitle.replace('#', '');
      if (handledTitle && handledTitle !== title) {
        console.log('CHANGING TITLE');
        changeTitle(handledTitle);
      }
      if (handledValue && String(handledValue).trim() !== text) {
        onChange(String(handledValue).trim());
      }
    }
  };

  render() {
    const {
      readOnly,
      onSave,
      className,
      onClickHeader,
      card,
      codeTheme = 'DRA',
      appTheme,
    } = this.props;

    const getCardText = (title, text) => {
      if (title && text) {
        return `# ${card.title}
${card.text}`;
      }
      if (title && !text) {
        return `# ${card.title}`;
      }
      return text;
    };
    const { title, text } = card;
    const value = getCardText(title, text);
    const palette = getPalette(appTheme);
    const editorTheme = getEditorTheme(palette);
    return (
      <Editor
        ref={this.editorRef}
        className={cx(className, 'mdyna-md', 'card-content')}
        readOnly={readOnly}
        autoFocus
        uploadImage={async img => MarkdownEditor.uploadImg(img)}
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
                const parsedEmoji = parseEmojis(rawEmoji);
                if (parsedEmoji) {
                  changes.moveFocusBackward(rawEmoji.length); // select last word
                  changes.insertText(parsedEmoji);
                } else {
                  changes.insertText(' ');
                }
              }
            },
          }),
        ]}
        onClickHeader={onClickHeader}
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
  onChange: PropTypes.func,
  onClickHeader: PropTypes.func,
  changeTitle: PropTypes.func,
  card: PropTypes.object,
  onSave: PropTypes.func,
  className: PropTypes.string,
  codeTheme: PropTypes.string,
  appTheme: PropTypes.string,
  readOnly: PropTypes.bool,
};

MarkdownEditor.defaultProps = {
  onClickHeader: null,
  onChange: null,
  changeTitle: null,
  onSave: null,
  className: '',
  codeTheme: '',
  readOnly: true,
  appTheme: 'dark',
  card: {},
};
