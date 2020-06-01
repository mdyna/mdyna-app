import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Masonry from 'react-masonry-css';
import { Box, Text, Collapsible } from 'grommet';
import Tooltip from 'UI/Tooltip';
import {
  Add, Previous, Next, Upload as Export, Download, Close, List,
} from 'grommet-icons';
import cx from 'classnames';
import { callFolderPicker, importFiles, importFilesListener } from 'Utils/events';
import CardItem from 'Containers/CardItem';

import MiniCardList from 'Components/MiniCardList';
import Button from 'UI/Button';
import Search from 'UI/Search';
import SortingMenu from 'UI/SortingMenu';
import LabelFilter from 'UI/LabelFilter';
import BoardPicker from 'UI/BoardPicker';

import './CardList.scss'; // eslint-disable-line
export default class CardList extends PureComponent {
  state = {
    pageView: 1,
    pageIndex: 0,
    miniListExpanded: false,
  };

  componentDidMount() {
    importFilesListener(cards => this.importCards(cards));
  }

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

  jumpToFirst() {
    this.setState({
      pageView: 1,
      pageIndex: 0,
    });
  }

  importCards(importedCards) {
    const { activeBoardId, importCards } = this.props;
    importCards(importedCards.map(c => ({ ...c, board: activeBoardId })));
  }

  addNewCard(card = {}) {
    const { addCard, activeBoardId } = this.props;
    const { pageView } = this.state;

    addCard(activeBoardId, card);

    if (pageView !== 1) {
      this.setState({
        pageView: 1,
        pageIndex: 0,
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
    return (
      <Button
        onClick={() => {
          this.addNewCard();
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
          <CardItem hasCardBar card={card} key={`${card.id}-card`} />
        )))
      || null
    );
  }

  renderCardControls() {
    const {
      isFocused,
      activeBoard,
      changeActiveBoard,
      boardNames,
      createBoard,
      toggleBoardsDialog,
      focusCard,
      activeBoardId,
      boards,
      searchInput,
      searchCards,
      searchHidden,
      titles,
      changeSorting,
      labelFilters,
      labels,
      order,
      addLabelFilter,
      removeLabelFilter,
      sorting,
    } = this.props;
    const { boardsExpanded } = this.state;
    const labelFilterFuncs = { addLabelFilter, removeLabelFilter };

    return (
      <Box className={cx('card-list-controls')} background="dark-1">
        {isFocused ? (
          <Button plain onClick={() => focusCard()}>
            <KeyboardEventHandler
              handleKeys={['esc']}
              onKeyEvent={(key) => {
                if (key === 'esc') {
                  focusCard();
                }
              }}
            />
            <Box direction="column" align="center">
              <Close color="accent-2" />
              <Text size="small" color="accent-2">(Esc)</Text>
            </Box>
          </Button>
        ) : (
          <>
            <Text
              style={{
                display: boardsExpanded ? 'none' : 'initial',
              }}
              weight="bold"
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
            <Button onClick={() => callFolderPicker(activeBoardId)}>
              <Tooltip
                icon={<Export color="brand" />}
                text="Export all cards from this board as Markdown files"
              />
            </Button>
            <Button onClick={() => importFiles()}>
              <Tooltip
                icon={<Download color="brand" />}
                text="Import md files to MDyna"
              />
            </Button>
            {this.renderAddNoteButton()}
            <SortingMenu
              changeSorting={changeSorting}
              order={order}
              sorting={sorting}
            />
            <LabelFilter labelFilterFuncs={labelFilterFuncs} labels={labels} labelFilters={labelFilters} />
            <Search
              searchInput={searchInput}
              onChange={searchCards}
              hidden={searchHidden}
              titles={titles}
            />
          </>
        )}
      </Box>
    );
  }

  renderCardPagination(cardItems) {
    const {
      cards, cardsPerPage, focusedCardId, focusCard, isEditing,
    } = this.props;
    const { pageIndex, pageView, miniListExpanded } = this.state;

    const hasMore = cardItems && cardItems.length > pageIndex + cardsPerPage;
    return (
      <Box direction="column" style={{ minWidth: '150px' }}>
        <Box direction="row" align="center" justify="between">
          <Button onClick={() => this.setState({ miniListExpanded: !miniListExpanded })} hoverIndicator="accent-3">
            <List color="brand" />
          </Button>
          <Text align="center" size="medium">
            {`${pageView}/${Math.ceil(cardItems.length / cardsPerPage)}`}
          </Text>
          {pageIndex !== 0 && (
          <Button
            className={cx(
              'page-control',
              pageIndex === 0 && 'disabled',
            )}
            onClick={() => this.getPreviousCards()}
          >
            {!isEditing && (
            <KeyboardEventHandler
              handleKeys={['left']}
              onKeyEvent={() => this.getPreviousCards()}
            />
            )}
            <Previous color="brand" />
          </Button>
          )}
          {hasMore && (
          <Button
            onClick={() => this.getNextCards()}
            className={cx('page-control', !hasMore && 'disabled')}
          >
            {!isEditing && (
            <KeyboardEventHandler
              handleKeys={['right']}
              onKeyEvent={() => this.getNextCards()}
            />
            )}
            <Next color="brand" />
          </Button>
          )}
        </Box>
        {pageIndex >= 2 && (
        <Button
          className={cx(
            'page-control',
            pageIndex === 0 && 'disabled',
          )}
          onClick={() => this.jumpToFirst()}
        >
          <Text size="xsmall" color="brand">Jump to first</Text>
        </Button>
        )}
        <Collapsible open={miniListExpanded}>
          <MiniCardList
            cards={cards}
            focusCard={focusCard}
            focusedCardId={focusedCardId}
            type="cards"
            long
          />
        </Collapsible>

      </Box>
    );
  }

  render() {
    const {
      cards, searchInput, cardsPerPage, isFocused,
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
          handleKeys={['a', 'ctrl + v']}
          onKeyEvent={(key) => {
            if (key === 'a' && !isFocused) {
              this.addNewCard();
            } else {
              navigator.clipboard
                .readText()
                .then((cardText) => {
                  if (cardText) {
                    const rawTitle = cardText.match(/^(.*)$/m)[0] || '';
                    const rawText = cardText.replace(rawTitle, '');
                    const text = rawText.trim();
                    const title = rawTitle.trim();
                    this.addNewCard({
                      text,
                      editingText: text,
                      title,
                      editingTitle: title,
                    });
                  }
                })
                .catch((err) => {
                  console.log('Something went wrong', err);
                });
            }
          }}
        />
        {this.renderCardControls()}
        {cards.length ? (
          <React.Fragment>
            {cardComponents && cardComponents.length ? (
              <div className="card-list-pagination">
                {!isFocused && (
                  <>
                    {this.renderCardPagination(cardItems)}
                    <Masonry
                      breakpointCols={BREAKPOINTS}
                      className="card-list-grid"
                      columnClassName="card-list-card"
                    >
                      {cardComponents}
                    </Masonry>
                  </>
                ) || cardComponents}
              </div>
            ) : (
              <Box alignSelf="center" align="center" className="no-notes-box">
                <Text tag="h1" size="xl">
                  {(searchInput
                    && 'No cards in this board match your search')
                    || 'No cards in this board. Press A to add a new card.'}
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

CardList.whyDidYouRender = true;

CardList.propTypes = {
  addCard: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
  labelFilters: PropTypes.array,
  boards: PropTypes.array,
  boardNames: PropTypes.array,
  focusedCardId: PropTypes.string,
  createBoard: PropTypes.func.isRequired,
  changeSorting: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  sorting: PropTypes.string.isRequired,
  toggleBoardsDialog: PropTypes.func.isRequired,
  changeActiveBoard: PropTypes.func.isRequired,
  focusCard: PropTypes.func.isRequired,
  activeBoardId: PropTypes.string,
  importCards: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  activeBoard: PropTypes.string.isRequired,
  cards: PropTypes.array,
  cardsPerPage: PropTypes.number,
  isFocused: PropTypes.bool.isRequired,
  labels: PropTypes.array.isRequired,
  addLabelFilter: PropTypes.func.isRequired,
  removeLabelFilter: PropTypes.func.isRequired,
  searchCards: PropTypes.func.isRequired,
  searchHidden: PropTypes.bool,
  titles: PropTypes.array,
};

CardList.defaultProps = {
  cardsPerPage: 8,
  boards: {},
  labelFilters: [],
  activeBoardId: '',
  boardNames: [],
  searchInput: '',
  cards: [],
  titles: [],
  focusedCardId: '',
  searchHidden: false,
};
