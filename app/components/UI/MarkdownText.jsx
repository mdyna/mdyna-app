import React, { PureComponent } from 'react';
import { Converter } from 'react-showdown';
import { toClass } from 'recompose';
import htmlescape from 'showdown-htmlescape';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TaskListInput from 'UI/TaskListInput';
import regExp from 'Utils/regexp';
import ReactHighlight from './CodeHighlight';

import './MarkdownText.scss'; // eslint-disable-line

export const CODE_THEMES = {
  'Atom One Light': 'AOL',
  'Atom One Dark': 'AOD',
};

class MarkdownText extends PureComponent {
  getCodeTheme() {
    const { whiteMode, codeTheme } = this.props;
    if (codeTheme === 'Default') {
      return whiteMode ? 'AOL' : 'AOD';
    }
    return CODE_THEMES[codeTheme];
  }

  render() {
    const {
      text, className, minimized, editCard, disableCode,
    } = this.props;
    const input = toClass(otherProps => (
      <TaskListInput
        className="card-tasklist"
        text={text}
        editCard={editCard}
        {...otherProps}
      />
    ));
    const converter = new Converter({
      headerLevelStart: 3,
      strikethrough: true,
      tables: true,
      tasklists: true,
      simpleLineBreaks: true,
      smoothLivePreview: false,
      smartIdentationFix: true,
      simplifiedAutoLink: true,
      literalMidWordUnderscores: true,
      openLinksInNewWindow: true,
      extensions: [htmlescape],
      flavor: 'github',
      components: { input },
    });
    let noteText = text && text.length > 300 ? `${text.substring(0, 300)}...` : text;

    noteText = text
      && text.match(regExp.codeRegExp)
      && text.match(regExp.codeRegExp).length
      ? `${noteText}\n\`\`\``
      : noteText;
    const rawText = minimized ? noteText : text;
    const formattedText = converter.convert(rawText) || '';
    if (disableCode) {
      return <div className="disable-code">{formattedText}</div>;
    }
    return (
      <ReactHighlight
        element="div"
        text={rawText}
        className={classnames(className, 'mdyna-md', this.getCodeTheme())}
      >
        {formattedText}
      </ReactHighlight>
    );
  }
}

export default MarkdownText;

MarkdownText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string.isRequired,
  minimized: PropTypes.bool,
  whiteMode: PropTypes.bool,
  codeTheme: PropTypes.string,
  disableCode: PropTypes.bool,
  editCard: PropTypes.object,
  color: PropTypes.string,
};

MarkdownText.defaultProps = {
  minimized: false,
  codeTheme: 'Default',
  whiteMode: false,
  editCard: null,
  disableCode: false,
  color: '#4E636E',
  text: '',
};
