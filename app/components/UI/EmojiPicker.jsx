import React from 'react';
import PropTypes from 'prop-types';

class MarkdownEditor extends React.PureComponent {
  render() {
    const { onSelect } = this.props;
    return (
      <React.Fragment>
        <h1>Cenas</h1>
      </React.Fragment>
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
