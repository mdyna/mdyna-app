import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Masonry from 'react-masonry-component';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Pulse from 'grommet/components/icons/base/Add';
import LeftIcon from 'grommet/components/icons/base/Previous';
import RightIcon from 'grommet/components/icons/base/Next';
import Label from 'grommet/components/Label';
import classnames from 'classnames';
import CardEditor from 'Containers/CardEditor';
import CardItem from 'Containers/CardItem';
import Button from 'UI/Button';
import Error from 'UI/Error';

import './CardList.scss'; // eslint-disable-line

const PAGE_SIZE = 6;

export default class CardList extends PureComponent {
  state = {
    pageIndex: 0,
  };

  componentDidUpdate() {
    const {
      cards,
    } = this.props;
    const { pageIndex } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems && cardItems.length
    && cardItems.slice(pageIndex, pageIndex + PAGE_SIZE);
    if (!cardComponents || !cardComponents.length) {
      this.getPreviousCards();
    }
  }

  getNextCards() {
    const { pageIndex } = this.state;

    this.setState({
      pageIndex: pageIndex + PAGE_SIZE,
    });
  }

  getPreviousCards() {
    const { pageIndex } = this.state;
    const newPageIndex = pageIndex - PAGE_SIZE;
    if (newPageIndex >= 0) {
      this.setState({
        pageIndex: pageIndex - PAGE_SIZE,
      });
    }
  }

  matchNoteLabelsWithLabelFilter(labels) {
    const { labelFilters, searchInput } = this.props;
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
    if (searchInput) {
      if (labels) {
        for (let i = 0; i < labels.length; i += 1) {
          if (labels[i].includes(searchInput)) {
            return true;
          }
        }
      }
      return false;
    }
    return false;
  }

  renderAddNoteButton() {
    const { toggleEditor } = this.props;

    return (
      <Button
        onClick={() => {
          toggleEditor(true);
        }}
        className="add-note-btn"
      >
        <Pulse />
      </Button>
    );
  }

  renderVisibleCards() {
    const {
      searchInput, completedFilterOn, cards,
    } = this.props;
    const filteredCards = cards.filter((d) => {
      const matchesLabelFilters = this.matchNoteLabelsWithLabelFilter(
        d.labels && d.labels.map(label => label.title),
      );
      const matchesSearchInput = (d.title && d.title.toLowerCase().includes(
        searchInput.toLowerCase(),
      ))
        || matchesLabelFilters;
      return Boolean(matchesSearchInput || matchesLabelFilters);
    });
    const visibleCards = [];
    for (let i = 0; i < filteredCards.length; i += 1) {
      const card = filteredCards[i];
      if (!card.completed || completedFilterOn) {
        visibleCards.push(<CardItem hasCardBar card={card} key={i} />);
      }
    }
    return (visibleCards.length && visibleCards) || null;
  }

  render() {
    const {
      whiteMode, cards, toggleEditor, searchInput, modalOpen,
    } = this.props;
    const { pageIndex } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems && cardItems.length
    && cardItems.slice(pageIndex, pageIndex + PAGE_SIZE);
    const hasMore = cardItems && cardItems.length > pageIndex + PAGE_SIZE;
    return (
      <Section
        className={classnames({
          'card-list': true,
          'white-mode': whiteMode,
        })}
        responsive
        direction="row"
      >
        <KeyboardEventHandler handleKeys={['a']} onKeyEvent={() => toggleEditor(true)} />
        <Headline align="center" size="medium">
          INBOX
        </Headline>
        {cards.length ? (
          <Error>
            {this.renderAddNoteButton()}
            {cardComponents && cardComponents.length ? (
              <div className="card-list-pagination">
                {pageIndex !== 0 && (
                  <Button
                    className="page-control"
                    type="button"
                    onClick={() => this.getPreviousCards()}
                  >
                    <KeyboardEventHandler
                      handleKeys={['left']}
                      onKeyEvent={() => this.getPreviousCards()}
                    />
                    <LeftIcon />
                  </Button>
                )}
                <Masonry
                  options={{
                    fitWidth: true,
                    horizontalOrder: true,
                    transitionDuration: 300,
                    gutter: 10,
                    resize: true,
                  }}
                  enableResizableChildren
                  elementType="ul"
                >
                  {cardComponents}
                </Masonry>
                {hasMore && (
                  <Button
                    onClick={() => this.getNextCards()}
                    type="button"
                    className="page-control"
                  >
                    <KeyboardEventHandler
                      handleKeys={['right']}
                      onKeyEvent={() => this.getNextCards()}
                    />
                    <RightIcon />
                  </Button>
                )}
              </div>
            ) : (
              <Label>No cards to present</Label>
            )}
          </Error>
        ) : (
          <React.Fragment>
            {this.renderAddNoteButton()}
            <Heading align="center" tag="h3">
              {searchInput ? 'No results found' : 'Click to add a new note'}
            </Heading>
          </React.Fragment>
        )}
        {modalOpen ? (
          <Layer
            overlayClose
            closer
            flush
            onClose={() => toggleEditor()}
            className={classnames('note-layer', { 'white-mode': whiteMode })}
          >
            <CardEditor toggleEditor={toggleEditor} />
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
};

CardList.defaultProps = {
  modalOpen: false,
  whiteMode: false,
  completedFilterOn: false,
  labelFilters: [],
  searchInput: '',
  cards: [],
};
