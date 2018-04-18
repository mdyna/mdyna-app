import React, { Component } from 'react';
import ReactMde from 'react-mde';
import PropTypes from 'prop-types';
import _ from 'lodash';


import '!style-loader!css-loader!sass-loader!../../../node_modules/react-mde/lib/styles/css/react-mde.css'; // eslint-disable-line
import '!style-loader!css-loader!sass-loader!../../../node_modules/react-mde/lib/styles/css/react-mde-textarea.css'; // eslint-disable-line
import '!style-loader!css-loader!sass-loader!../../../node_modules/react-mde/lib/styles/css/react-mde-toolbar.css'; // eslint-disable-line

class Task extends Component {
  render() {
    const { text, changeTaskSetting, settingName, className } = this.props;
    return (
      <ReactMde
        className={className}
        value={{
          text,
        }
        }
        textAreaProps={{
          value: text,
        }}
        visibility={{ preview: false }}
        onChange={e => changeTaskSetting(_.snakeCase(settingName), e.text)}
      />
    );
  }
}

export default Task;

Task.propTypes = {
  text: PropTypes.string,
  settingName: PropTypes.string,
  className: PropTypes.string,
  changeTaskSetting: PropTypes.func.isRequired,
};

Task.defaultProps = {
  text: '',
  className: 'text-editor',
  settingName: 'text',
};
