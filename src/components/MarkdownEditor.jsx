import React, { Component } from 'react';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '!style-loader!css-loader!sass-loader!../../node_modules/react-mde/lib/styles/css/react-mde.css'; // eslint-disable-line
import '!style-loader!css-loader!sass-loader!../../node_modules/react-mde/lib/styles/css/react-mde-textarea.css'; // eslint-disable-line
import '!style-loader!css-loader!sass-loader!../../node_modules/react-mde/lib/styles/css/react-mde-toolbar.css'; // eslint-disable-line

class Note extends Component {
  render() {
    const { text, changeNoteSetting, settingName, className } = this.props;
    return (
      <ReactMde
        className={className}
        value={{
          text,
        }}
        textAreaProps={{
          value: text,
        }}
        visibility={{ preview: false }}
        onChange={e => changeNoteSetting(_.snakeCase(settingName), e.text)}
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
