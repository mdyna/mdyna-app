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
import CardEditor from '../../containers/CardEditor';
import CardItem from '../../containers/CardItem';

import '!style-loader!css-loader!sass-loader!./CardList.scss'; // eslint-disable-line
const CARD_FREQUENCIES = ['daily', 'weekly', 'monthly'];

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
      if (this.props.isTaskList) {
        if (card.repeat) {
          visibleCards.push(
            <CardItem
              hasCardBar
              card={card}
              cardOptions={{ isNote: false, isTask: true }}
              key={i}
            />,
          );
        }
      } else if (!card.repeat && (!card.completed || this.props.completedFilterOn)) {
        visibleCards.push(
          <CardItem hasCardBar card={card} cardOptions={{ isNote: true, isTask: false }} key={i} />,
        );
      }
    }
    return (visibleCards.length && visibleCards.reverse()) || null;
  }

  renderCardsByFrequency() {
    const cardFrequencySections = [];
    for (let i = 0; i < CARD_FREQUENCIES.length; i += 1) {
      const frequency = CARD_FREQUENCIES[i];
      const frequencyTitle = (
        <Headline align="start" key={frequency} size="small">
          {frequency.toUpperCase()}
        </Headline>
      );
      const cards = this.props.cards.filter((d) => {
        const matchesSearchInput =
          d.title && d.title.toLowerCase().startsWith(this.props.searchInput.toLowerCase());
        const matchesLabelFilters = this.matchNoteLabelsWithLabelFilter(
          d.labels && d.labels.map(label => label.title),
        );
        const matchesFrequency = d.cardFrequency && d.cardFrequency === frequency;
        return matchesSearchInput && matchesLabelFilters && matchesFrequency && d.repeat;
      });
      const sectionCards = [];
      for (let cardIndex = 0; cardIndex < cards.length; cardIndex += 1) {
        const card = cards[cardIndex];
        sectionCards.push(
          <CardItem
            hasCardBar
            card={card}
            cardOptions={{ isNote: false, isTask: true }}
            key={`visibile-task-${cardIndex}`}
          />,
        );
      }
      if (sectionCards && sectionCards.length) {
        cardFrequencySections.push(frequencyTitle);
        cardFrequencySections.push([...sectionCards].reverse());
      }
    }
    return cardFrequencySections;
  }

  render() {
    const cardItems = this.props.sortByFrequency
      ? this.renderCardsByFrequency()
      : this.renderVisibleCards();
    const listIsEmpty = this.props.isTaskList &&
    this.props.cards.filter(card => card.repeat).length === 0;

    return !listIsEmpty && (
      <Section
        className={classnames({
          'card-list': true,
          'task-list': this.props.isTaskList,
          'white-mode': this.props.whiteMode,
        })}
        responsive
        direction="row"
      >
        <Headline align="center" size="medium">
          {this.props.isTaskList ? 'INBOX' : 'NOTES'}
        </Headline>
        {this.props.cards.length ? (
          <React.Fragment>
            {!this.props.isTaskList && this.renderAddNoteButton()}
            {
              cardItems && cardItems.length ?
                <Columns
                  maxCount={5}
                  masonry={!this.props.isTaskList}
                  responsive
                  className="visible-cards"
                >
                  {cardItems}
                </Columns>
                : ''
            }
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
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  completedFilterOn: PropTypes.bool,
  cards: PropTypes.array,
  isTaskList: PropTypes.bool,
  sortByFrequency: PropTypes.bool,
};

CardList.defaultProps = {
  modalOpen: false,
  whiteMode: false,
  completedFilterOn: false,
  labelFilters: [],
  isTaskList: false,
  sortByFrequency: false,
  searchInput: '',
  cards: [],
};
