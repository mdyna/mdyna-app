import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

class NotePreview extends Component {
  render() {
    const { note, changeNoteSetting } = this.props;
    return <NoteItem className="note-preview" changeNoteSetting={changeNoteSetting} note={note} />;
  }
}

export default NotePreview;

NotePreview.propTypes = {
  note: PropTypes.object,
  changeNoteSetting: PropTypes.func.isRequired,
};

NotePreview.defaultProps = {
  note: {},
};
