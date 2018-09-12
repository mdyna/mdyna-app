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
  matchNoteLabelsWithLabelFilter(labels) {
    const { labelFilters } = this.props;
    if (labelFilters.length) {
      for (let i = 0; i < labels.length; i += 1) {
        if (labelFilters.indexOf(labels[i]) !== -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  renderVisibleNotes() {
    const notes = this.props.notes.filter(
      (d) => {
        const matchesSearchInput = d.title &&
        d.title.toLowerCase().startsWith(this.props.searchInput.toLowerCase());
        const matchesLabelFilters = this.matchNoteLabelsWithLabelFilter(
          d.labels.map(label => label.title),
        );
        return matchesSearchInput && matchesLabelFilters;
      },
    );
    console.log(notes);
    const visibleNotes = [];
    for (let i = 0; i < notes.length; i += 1) {
      const note = notes[i];
      visibleNotes.push(<NoteItem hasNoteBar note={note} key={i} />);
    }
    return visibleNotes.reverse();
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
        {this.props.notes.length ? (
          <Columns maxCount={5} masonry responsive className="visible-notes">
            {this.renderVisibleNotes()}
          </Columns>
        ) : (
          <Heading align="center" tag="h3">
            {this.props.searchInput ? 'No results found' : 'Click to add a new note'}
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
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  notes: PropTypes.array,
};

NoteList.defaultProps = {
  modalOpen: false,
  whiteMode: false,
  labelFilters: [],
  searchInput: '',
  notes: [],
};
