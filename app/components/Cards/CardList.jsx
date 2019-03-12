import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Masonry from 'react-masonry-component';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/base/Add';
import classnames from 'classnames';
import CardEditor from '../../containers/CardEditor';
import CardItem from '../../containers/CardItem';

import '!style-loader!css-loader!sass-loader!./CardList.scss'; // eslint-disable-line

export default class CardList extends Component {
  matchNoteLabelsWithLabelFilter(labels) {
    const { labelFilters } = this.props;
    if (labelFilters.length) {
      if (labels) {
        for (let i = 0; i < labels.length; i += 1) {
          if (labelFilters.indexOf(labels[i]) !== -1) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  }

  renderAddNoteButton() {
    return (
      <Button
        onClick={() => {
          this.props.toggleEditor(true);
        }}
        className="add-note-btn"
      >
        <Pulse />
      </Button>
    );
  }

  renderVisibleCards() {
    const cards = this.props.cards.filter((d) => {
      const matchesSearchInput =
        d.title && d.title.toLowerCase().startsWith(this.props.searchInput.toLowerCase());
      const matchesLabelFilters = this.matchNoteLabelsWithLabelFilter(
        d.labels && d.labels.map(label => label.title),
      );
      return matchesSearchInput && matchesLabelFilters;
    });
    const visibleCards = [];
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      if (!card.repeat && (!card.completed || this.props.completedFilterOn)) {
        visibleCards.push(<CardItem hasCardBar card={card} key={i} />);
      }
    }
    return (visibleCards.length && visibleCards.reverse()) || null;
  }

  render() {
    const cardItems = this.props.sortByFrequency
      ? this.renderCardsByFrequency()
      : this.renderVisibleCards();

    return (
      <Section
        className={classnames({
          'card-list': true,
          'white-mode': this.props.whiteMode,
        })}
        responsive
        direction="row"
      >
        <KeyboardEventHandler handleKeys={['a']} onKeyEvent={() => this.props.toggleEditor(true)} />
        <Headline align="center" size="medium">
          INBOX
        </Headline>
        {this.props.cards.length ? (
          <React.Fragment>
            {this.renderAddNoteButton()}
            {cardItems && cardItems.length ? (
              <Masonry
                options={{
                  fitWidth: true,
                }}
                elementType={'ul'}
              >
                {cardItems}
              </Masonry>
            ) : (
              ''
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.renderAddNoteButton()}
            <Heading align="center" tag="h3">
              {this.props.searchInput ? 'No results found' : 'Click to add a new note'}
            </Heading>
          </React.Fragment>
        )}
        {this.props.modalOpen ? (
          <Layer
            overlayClose
            closer
            flush
            onClose={() => this.props.toggleEditor()}
            className={classnames('note-layer', { 'white-mode': this.props.whiteMode })}
          >
            <CardEditor toggleEditor={this.props.toggleEditor} />
          </Layer>
        ) : (
          ''
        )}
      </Section>
    );
  }
}

CardList.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool,
  whiteMode: PropTypes.bool,
  sidebarExpanded: PropTypes.bool,
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  completedFilterOn: PropTypes.bool,
  cards: PropTypes.array,
  sortByFrequency: PropTypes.bool,
};

CardList.defaultProps = {
  modalOpen: false,
  whiteMode: false,
  completedFilterOn: false,
  sidebarExpanded: false,
  labelFilters: [],
  sortByFrequency: false,
  searchInput: '',
  cards: [],
};
