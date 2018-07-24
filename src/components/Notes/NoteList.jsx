import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Columns from 'grommet/components/Columns';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/base/Add';
import classnames from 'classnames';
import NoteEditor from '../../containers/CardEditor';
import NoteItem from '../../containers/NoteItem';

import '!style-loader!css-loader!sass-loader!./NoteList.scss'; // eslint-disable-line

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes,
      whiteMode: this.props.whiteMode,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      notes: newProps.notes,
      whiteMode: newProps.whiteMode,
    });
  }

  visibleNotes() {
    const notes = [];
    for (let i = 0; i < this.state.notes.length; i += 1) {
      const note = this.state.notes[i];
      notes.push(<NoteItem hasNoteBar note={note} key={i} />);
    }
    return notes.reverse();
  }

  render() {
    return (
      <Section
        className={classnames({ 'note-list': true, 'white-mode': this.props.whiteMode })}
        responsive
        direction="row"
      >
        <Headline align="center" size="medium">
          NOTES
        </Headline>
        {this.state.notes.length ? (
          <Columns masonry responsive maxCount={3} justify={'center'} className="visible-notes">
            {this.visibleNotes()}
          </Columns>
        ) : (
          <Heading align="center" tag="h3">
            Click to add new note
          </Heading>
        )}
        <Button
          onClick={() => {
            this.props.toggleEditor(true);
          }}
          className="add-note-btn"
        >
          <Pulse />
        </Button>
        {this.props.modalOpen ? (
          <Layer
            overlayClose
            closer
            flush
            onClose={() => this.props.toggleEditor()}
            className={classnames('note-layer', { 'white-mode': this.props.whiteMode })}
          >
            <NoteEditor toggleEditor={this.props.toggleEditor} />
          </Layer>
        ) : (
          ''
        )}
      </Section>
    );
  }
}

NoteList.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  whiteMode: PropTypes.bool,
  notes: PropTypes.array,
};

NoteList.defaultProps = {
  modalOpen: false,
  whiteMode: false,
  notes: [],
};
