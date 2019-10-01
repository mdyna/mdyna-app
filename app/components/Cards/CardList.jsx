import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Masonry from 'react-masonry-css';
import { Box, Text } from 'grommet';
import { Add, Previous, Next } from 'grommet-icons';
import cx from 'classnames';
import CardItem from 'Containers/CardItem';
import Button from 'UI/Button';
import BoardPicker from 'UI/BoardPicker';

import './CardList.scss'; // eslint-disable-line

export default class CardList extends PureComponent {
  state = {
    pageView: 1,
    pageIndex: 0,
  };

  componentDidUpdate() {
    const { cards, cardsPerPage } = this.props;
    const { pageIndex } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems
      && cardItems.length
      && cardItems.slice(pageIndex, pageIndex + cardsPerPage);
    if (!cardComponents || !cardComponents.length) {
      this.getPreviousCards();
    }
  }

  getNextCards() {
    const { cardsPerPage } = this.props;
    const { pageIndex, pageView } = this.state;

    this.setState({
      pageView: pageView + 1,
      pageIndex: pageIndex + cardsPerPage,
    });
  }

  getPreviousCards() {
    const { cardsPerPage } = this.props;
    const { pageIndex, pageView } = this.state;
    const newPageIndex = pageIndex - cardsPerPage;
    if (newPageIndex >= 0) {
      this.setState({
        pageIndex: pageIndex - cardsPerPage,
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
    const { searchInput, cards, labelFilters } = this.props;
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
    return (
      (filteredCards.length
        && filteredCards.map(card => (
          <CardItem hasCardBar card={card} key={`${card.title}-card`} />
        )))
      || null
    );
  }

  renderCardControls(cardItems) {
    const {
      isFocused,
      cardsPerPage,
      activeBoard,
      changeActiveBoard,
      boardNames,
      createBoard,
      toggleBoardsDialog,
      boards,
    } = this.props;
    const { pageView, pageIndex, boardsExpanded } = this.state;
    const hasMore = cardItems && cardItems.length > pageIndex + cardsPerPage;
    return (
      <Box
        className={cx('card-list-controls', isFocused && 'hidden')}
        background="dark-1"
      >
        <Text
          style={{
            display: boardsExpanded ? 'none' : 'initial',
          }}
          align="center"
          size="xxlarge"
        >
          {activeBoard}
        </Text>
        <BoardPicker
          addButton
          createBoard={createBoard}
          onClick={changeActiveBoard}
          boardNames={boardNames}
          boards={boards}
          toggleBoardsDialog={toggleBoardsDialog}
        />
        {this.renderAddNoteButton()}
        <Text align="center" size="medium">
          {cardItems && cardItems.length
            ? `${pageView}/${Math.ceil(cardItems.length / cardsPerPage)}`
            : '0'}
        </Text>
        <Button
          className={cx('page-control', pageIndex === 0 && 'disabled')}
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
          className={cx('page-control', !hasMore && 'disabled')}
        >
          <KeyboardEventHandler
            handleKeys={['right']}
            onKeyEvent={() => this.getNextCards()}
          />
          <Next color="brand" />
        </Button>
      </Box>
    );
  }

  render() {
    const {
      cards, toggleEditor, searchInput, cardsPerPage,
    } = this.props;
    const { pageIndex } = this.state;
    const cardItems = this.renderVisibleCards(cards);
    const cardComponents = cardItems
      && cardItems.length
      && cardItems.slice(pageIndex, pageIndex + cardsPerPage);
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
        {this.renderCardControls(cardItems)}
        {cards.length ? (
          <React.Fragment>
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
  boards: PropTypes.array,
  boardNames: PropTypes.array,
  createBoard: PropTypes.func.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  changeActiveBoard: PropTypes.func.isRequired,
  activeBoard: PropTypes.string.isRequired,
  cards: PropTypes.array,
  cardsPerPage: PropTypes.number,
  isFocused: PropTypes.bool.isRequired,
};

CardList.defaultProps = {
  cardsPerPage: 8,
  boards: {},
  labelFilters: [],
  boardNames: [],
  searchInput: '',
  cards: [],
};
