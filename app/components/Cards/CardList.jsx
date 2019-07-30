import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Masonry from 'react-masonry-css';
import { Box, Text } from 'grommet';
import { Add, Previous, Next } from 'grommet-icons';
import cx from 'classnames';
import CardItem from 'Containers/CardItem';
import Button from 'UI/Button';

import './CardList.scss'; // eslint-disable-line

const PAGE_SIZE = 6;

export default class CardList extends PureComponent {
  state = {
    pageView: 1,
    pageIndex: 0,
  };

  componentDidUpdate() {
    const { cards } = this.props;
    const { pageIndex } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems
      && cardItems.length
      && cardItems.slice(pageIndex, pageIndex + PAGE_SIZE);
    if (!cardComponents || !cardComponents.length) {
      this.getPreviousCards();
    }
  }

  getNextCards() {
    const { pageIndex, pageView } = this.state;

    this.setState({
      pageView: pageView + 1,
      pageIndex: pageIndex + PAGE_SIZE,
    });
  }

  getPreviousCards() {
    const { pageIndex, pageView } = this.state;
    const newPageIndex = pageIndex - PAGE_SIZE;
    if (newPageIndex >= 0) {
      this.setState({
        pageIndex: pageIndex - PAGE_SIZE,
        pageView: pageView - 1,
      });
    }
  }

  matchNoteLabelsWithLabelFilter(labels) {
    const { labelFilters, searchInput } = this.props;
    if (labelFilters.length) {
      if (labels) {
        let labelMatches = 0;

        for (let i = 0; i < labelFilters.length; i += 1) {
          if (labels.indexOf(labelFilters[i]) !== -1) {
            labelMatches += 1;
          }
        }
        return labelMatches === labelFilters.length;
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
        className="page-control add-note-btn"
      >
        <Add color="brand" />
      </Button>
    );
  }

  renderVisibleCards() {
    const {
      searchInput, completedFilterOn, cards, labelFilters,
    } = this.props;
    const filteredCards = cards.filter((d) => {
      const matchesLabelFilters = this.matchNoteLabelsWithLabelFilter(
        d.labels && d.labels.map(label => label.title),
      );
      // eslint-disable-next-line max-len
      const matchesSearchInput = d.title
        && d.title.toLowerCase
        && d.title.toLowerCase().includes(searchInput.toLowerCase());
      let labelsMatchSearch = false;
      if (d.labels) {
        for (let i = 0; i <= d.labels.length && !labelsMatchSearch; i += 1) {
          const label = d.labels[i];
          if (label && label.title) {
            if (label.title.toLowerCase().includes(searchInput.toLowerCase())) {
              labelsMatchSearch = true;
            }
          }
        }
      }
      if (searchInput && !labelFilters.length) {
        return Boolean(matchesSearchInput || labelsMatchSearch);
      }
      if (searchInput && labelFilters.length) {
        return Boolean(matchesSearchInput && matchesLabelFilters);
      }
      if (labelFilters.length && !searchInput) {
        return Boolean(matchesLabelFilters);
      }
      return true;
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
      cards, toggleEditor, searchInput, isFocused,
    } = this.props;
    const { pageIndex, pageView } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems
      && cardItems.length
      && cardItems.slice(pageIndex, pageIndex + PAGE_SIZE);
    const hasMore = cardItems && cardItems.length > pageIndex + PAGE_SIZE;
    const BREAKPOINTS = cardComponents
      && cardComponents.length && {
      default: 3,
      2000: cardComponents.length > 3 ? 4 : cardComponents.length,
      1600: cardComponents.length > 2 ? 3 : cardComponents.length,
      1280: cardComponents.length > 2 ? 3 : cardComponents.length,
      992: cardComponents.length > 1 ? 2 : 1,
      768: 1,
    };
    return (
      <Box className="card-list" background="dark-3" responsive direction="row">
        <KeyboardEventHandler
          handleKeys={['a']}
          onKeyEvent={() => toggleEditor(true)}
        />
        {cards.length ? (
          <React.Fragment>
            <Box
              className={cx('card-list-controls', isFocused && 'hidden')}
              background="dark-1"
            >
              <Text align="center" size="xxlarge">
                INBOX
              </Text>
              {this.renderAddNoteButton()}
              <Text align="center" size="medium">
                {cardItems && cardItems.length
                  ? `${pageView}/${Math.ceil(cardItems.length / PAGE_SIZE)}`
                  : '0'}
              </Text>
              <Button
                className={cx('page-control', pageIndex === 0 && 'disabled')}
                type="button"
                onClick={() => this.getPreviousCards()}
              >
                <KeyboardEventHandler
                  handleKeys={['left']}
                  onKeyEvent={() => this.getPreviousCards()}
                />
                <Previous color="brand" />
              </Button>
              <Button
                onClick={() => this.getNextCards()}
                type="button"
                className={cx('page-control', !hasMore && 'disabled')}
              >
                <KeyboardEventHandler
                  handleKeys={['right']}
                  onKeyEvent={() => this.getNextCards()}
                />
                <Next color="brand" />
              </Button>
            </Box>
            {cardComponents && cardComponents.length ? (
              <div className="card-list-pagination">
                <Masonry
                  breakpointCols={BREAKPOINTS}
                  className="card-list-grid"
                  columnClassName="card-list-card"
                >
                  {cardComponents}
                </Masonry>
              </div>
            ) : (
              <Box alignSelf="center" align="center" className="no-notes-box">
                <Text tag="h1" size="xl">
                  No cards to present
                </Text>
              </Box>
            )}
          </React.Fragment>
        ) : (
          <Box alignSelf="center" align="center" className="no-notes-box">
            {this.renderAddNoteButton()}
            <Text tag="h1" size="xl">
              {searchInput
                ? 'No results found'
                : 'Click to add a new note or press \'A\''}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

CardList.propTypes = {
  toggleEditor: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  completedFilterOn: PropTypes.bool,
  cards: PropTypes.array,
  isFocused: PropTypes.bool.isRequired,
};

CardList.defaultProps = {
  completedFilterOn: false,
  labelFilters: [],
  searchInput: '',
  cards: [],
};
