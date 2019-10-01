import React from 'react';
import cx from 'classnames';
import Editor from 'rich-markdown-editor';
import MarkdownSerializer from 'slate-md-serializer';
import { theme, getCodeTheme } from './RTEditorThemes';

const Markdown = new MarkdownSerializer();
class RTEditor extends React.PureComponent {
  editorRef = React.createRef();

  componentDidUpdate(prevProps) {
    const { value, readOnly } = this.props;
    if (value !== prevProps.value && readOnly) {
      this.editorRef.current.setState({
        editorValue: Markdown.deserialize(value),
      });
    }
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value());
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
    } = this.props;
    return (
      <Editor
        ref={this.editorRef}
        className={cx(className, 'mdyna-md', 'card-content')}
        readOnly={readOnly}
        autoFocus={!readOnly}
        defaultValue={value}
        onSave={() => onSave(card)}
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
        toc
        theme={{
          ...theme,
          ...getCodeTheme(codeTheme),
        }}
      />
    );
  }
}

export default RTEditor;
