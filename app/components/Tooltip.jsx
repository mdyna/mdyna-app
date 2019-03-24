import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './Cards/CardItem';

class Tooltip extends Component {
  render() {
    const { text, color = '#a7ffeb', title = 'Help' } = this.props;
    return <NoteItem className="tooltip" card={{ text, color, title }} showAllText />;
  }
}

export default Tooltip;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
};

Tooltip.defaultProps = {
  show: false,
};
