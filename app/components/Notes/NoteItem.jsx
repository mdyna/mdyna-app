import React, { Component } from 'react';
import tinycolor from 'tinycolor2';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import CardBar from '../Cards/CardBar';
import unNest from '../../utils/nest';
import MarkdownText from '../MarkdownText';
import Labels from '../Labels';

import '!style-loader!css-loader!sass-loader!./NoteItem.scss'; // eslint-disable-line

export const COLOR_SAMPLES = [
  '#03A9F4',
  '#0D47A1',
  '#4E636E',
  '#64FFDA',
  '#4CAF50',
  '#FFEB3B',
  '#FF7043',
  '#F44336',
  '#F48FB0',
];

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

function minimizeNote(note) {
  note.setState({
    minimized: (note && note.state && !note.state.minimized) || false,
  });
}

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
  constructor(props) {
    super(props);
    this.state = {
      minimized: unNest(props, 'note.text') && unNest(props, 'note.text').length > 300, // automatically clip over 500 chars
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.note && this.props.note) {
      return assertNoteChanges(nextProps.note, this.props.note);
    }
    return false;
  }

  render() {
    const { note, i, className, hasNoteBar, whiteMode } = this.props;

    const color =
      (note && note.color) || this.props.changeNoteSetting('color', _.sample(COLOR_SAMPLES));
    const minimize = this.props.showAllText ? false : this.state.minimized;
    const noteActions = {
      generateCardLink: this.props.generateNoteLink,
      toggleCard: this.props.toggleNote,
      removeCard: this.props.removeNote,
      minimizeCard: note.text && note.text.length > 300 ? minimizeNote : null,
      editCard: this.props.editNote,
      removeLabel: this.props.removeLabel,
    };
    const cardOptions = {
      isNote: true,
      minimized: this.state.minimized,
    };
    return (
      <Card
        key={i}
        className={classnames(className, COLOR_LABELS[color], 'note-item', {
          minimized: this.state.minimized,
        })}
        style={{
          filter: `drop-shadow(3px -6px 3px ${tinycolor(color).darken(25)})`,
          backgroundColor: color || '#4E636E',
        }}
      >
        {hasNoteBar ? (
          <CardBar
            card={note}
            cardActions={noteActions}
            options={cardOptions}
          />
        ) : (
          ''
        )}
        <Heading align="start" tag="h1" strong>
          {note.title}
        </Heading>
        <Labels labels={note.labels} color={color} />
        <MarkdownText
          whiteMode={whiteMode}
          className="note-card-content"
          minimized={minimize}
          color={color}
          text={note.text}
        />
      </Card>
    );
  }
}

export default Note;

Note.propTypes = {
  note: PropTypes.object.isRequired,
  hasNoteBar: PropTypes.bool,
  whiteMode: PropTypes.bool,
  showAllText: PropTypes.bool,
  editNote: PropTypes.func,
  className: PropTypes.string,
  removeNote: PropTypes.func,
  toggleNote: PropTypes.func,
  removeLabel: PropTypes.func,
  generateNoteLink: PropTypes.func,
  changeNoteSetting: PropTypes.func.isRequired,
  i: PropTypes.number,
};

Note.defaultProps = {
  i: 0,
  removeNote: null,
  editNote: null,
  whiteMode: false,
  showAllText: false,
  addLabel: null,
  removeLabel: null,
  toggleNote: null,
  generateNoteLink: null,
  hasNoteBar: false,
  className: '',
};
