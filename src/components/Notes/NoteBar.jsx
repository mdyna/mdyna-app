import React, { Component } from 'react';
import Share from 'grommet/components/icons/base/Share';
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

import '!style-loader!css-loader!sass-loader!./NoteBar.scss'; // eslint-disable-line
import { assertNoteChanges } from './NoteItem';

const REMOVE_NOTE_ENDPOINT = `${window.serverHost}/removeNote/`;
const ADD_NOTE_ENDPOINT = `${window.serverHost}/addNote/`;

class NoteBar extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.note && this.props.note) {
      return assertNoteChanges(nextProps.note, this.props.note);
    }
    return false;
  }

  getNoteShortLink(note) {
    if (!note.shortLink) {
      fetch(ADD_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
        .then(data => data.json())
        .then((res) => {
          const responseKeys = {
            noteId: res.note_id,
            shortLink: res.short_link,
          };
          this.props.generateNoteLink(responseKeys, note.noteId);
        })
        .catch(error => console.log(error));
    }
  }

  removeNote(note) {
    if (note.shortLink) {
      fetch(REMOVE_NOTE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      }).catch(error => console.log(error));
    }
    this.props.removeNote(note);
  }

  render() {
    const { note, editNote, toggleNote } = this.props;
    return (
      <div
        className="note-bar"
        style={{ filter: `drop-shadow(6px 3px 6px ${tinycolor(note.color).darken(25)})` }}
      >
        <Button onClick={() => toggleNote(note)}>
          <CheckmarkIcon
            className={classnames({ 'checkmark-icon': true, completed: note.completed })}
          />
        </Button>
        <Button onClick={() => editNote(note)}>
          <EditIcon className="edit-icon" />
        </Button>
        <Button onClick={() => this.removeNote(note)}>
          <TrashIcon className="close-icon" />
        </Button>
        <div className={classnames('share-box', { sharing: note.shortLink })}>
          <Button onClick={() => this.getNoteShortLink(note)}>
            <Share className="share-icon" />
          </Button>
          <span>{note.shortLink}</span>
        </div>
      </div>
    );
  }
}

export default NoteBar;

NoteBar.propTypes = {
  note: PropTypes.object.isRequired,
  editNote: PropTypes.func.isRequired,
  toggleNote: PropTypes.func.isRequired,
  generateNoteLink: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
};
