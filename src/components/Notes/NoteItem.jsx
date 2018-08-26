import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Converter } from 'react-showdown';
import htmlescape from 'showdown-htmlescape';
import _ from 'lodash';
import NoteBar from './NoteBar';
import '!style-loader!css-loader!sass-loader!./NoteItem.scss'; // eslint-disable-line

export const COLOR_SAMPLES = [
  '#9FA8DA',
  '#0D47A1',
  'rgb(78, 99, 110)',
  '#64ffda',
  '#4CAF50',
  '#B2FF59',
  '#FFEB3B',
  '#FF7043',
  '#F44336',
  '#F48FB',
];


export function assertNoteChanges(newNote, oldNote) {
  const noteProps = Object.keys(newNote);
  for (let i = 0; i < noteProps.length; i += 1) {
    const setting = noteProps[i];
    if (!oldNote[setting] || oldNote[setting] !== newNote[setting]) {
      return true;
    }
  }
  return false;
}
class Note extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.note && this.props.note) {
      return assertNoteChanges(nextProps.note, this.props.note);
    }
    return false;
  }

  render() {
    const { note, i, className, hasNoteBar } = this.props;
    const converter = new Converter({
      headerLevelStart: 3,
      extensions: [htmlescape],
    });
    const rawText = note && note.text;
    const color =
      (note && note.color) || this.props.changeNoteSetting('color', _.sample(COLOR_SAMPLES));
    const noteText = converter.convert(rawText) || '';
    return (
      <Card
        key={i}
        className={classnames(className, 'note-item')}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color || '#4e636e',
        }}
      >
        {hasNoteBar ? (
          <NoteBar
            note={note}
            generateNoteLink={this.props.generateNoteLink}
            toggleNote={this.props.toggleNote}
            removeNote={this.props.removeNote}
            editNote={this.props.editNote}
          />
        ) : (
          ''
        )}
        <Heading align="start" tag="h1" strong>
          {note.title}
        </Heading>
        <div className="labels">
          {
            note && note.labels ? note.labels.map(label => (
              <span
                style={{
                  backgroundColor: tinycolor(color).darken(30),
                  borderRadius: '50px',
                  padding: '5px',
                }}
                key={`label-${label.title}`}
              >
                {label.title}
              </span>
            )) : ''
          }
        </div>
        <div className="note-card-content">{noteText}</div>
      </Card>
    );
  }
}

export default Note;

Note.propTypes = {
  note: PropTypes.object.isRequired,
  hasNoteBar: PropTypes.bool,
  editNote: PropTypes.func,
  className: PropTypes.string,
  removeNote: PropTypes.func,
  toggleNote: PropTypes.func,
  generateNoteLink: PropTypes.func,
  changeNoteSetting: PropTypes.func.isRequired,
  i: PropTypes.number,
};

Note.defaultProps = {
  i: 0,
  removeNote: null,
  editNote: null,
  toggleNote: null,
  generateNoteLink: null,
  hasNoteBar: false,
  className: '',
};
