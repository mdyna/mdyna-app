import React, { Component } from 'react';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactHighlight from './CodeHighlight';

import '!style-loader!css-loader!sass-loader!./MarkdownText.scss'; // eslint-disable-line

const COLOR_LABELS = {
  '#03A9F4': 'light-blue',
  '#0D47A1': 'dark-blue',
  '#4E636E': 'grey',
  '#64FFDA': 'dyna-green',
  '#4CAF50': 'green',
  '#FFEB3B': 'yellow',
  '#FF7043': 'orange',
  '#F44336': 'red',
  '#F48FB0': 'pink',
};

class MarkdownText extends Component {
  render() {
    const { text, className, color, minimized, whiteMode } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      extensions: [htmlescape],
    });
    const noteText = text && text.length > 300 ? `${text.substring(0, 300)}...` : text;
    const rawText = minimized ? noteText : text;
    const formattedText = converter.convert(rawText) || '';
    return (
      <ReactHighlight
        element="div"
        text={noteText}
        className={classnames(className, COLOR_LABELS[color], whiteMode && 'white-mode', 'dyna-md')}
      >
        {formattedText}
      </ReactHighlight>
    );
  }
}

export default MarkdownText;

MarkdownText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  minimized: PropTypes.bool,
  whiteMode: PropTypes.bool,
  color: PropTypes.string.isRequired,
};

MarkdownText.defaultProps = {
  minimized: false,
  whiteMode: false,
};
