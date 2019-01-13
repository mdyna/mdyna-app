import React, { Component } from 'react';
import { Converter } from 'react-showdown';
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
  '#a7ffeb': 'dyna-green',
  '#b9f6ca': 'green',
  '#fff475': 'yellow',
  '#ffd180': 'orange',
  '#a7c0cd': 'grey',
};

class MarkdownText extends Component {
  render() {
    const { text, className, color, minimized, whiteMode } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      strikethrough: true,
      tables: true,
      tasklists: true,
      simpleLineBreaks: true,
      smoothLivePreview: true,
      smartIdentationFix: true,
      simplifiedAutoLink: true,
      literalMidWordUnderscores: true,
      openLinksInNewWindow: true,
      extensions: [htmlescape],
    });
    let noteText = text && text.length > 300 ? `${text.substring(0, 300)}...` : text;

    noteText =
      text && text.match(regExp.codeRegExp) && text.match(regExp.codeRegExp).length
        ? `${noteText}\n\`\`\``
        : noteText;
    const rawText = minimized ? noteText : text;
    const formattedText = converter.convert(rawText) || '';
    return (
      <ReactHighlight
        element="div"
        text={rawText}
        className={classnames(className, COLOR_LABELS[color], whiteMode && 'white-mode', 'dyna-md')}
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
  color: PropTypes.string,
};

MarkdownText.defaultProps = {
  minimized: false,
  whiteMode: false,
  color: '#4E636E',
  text: '',
};
