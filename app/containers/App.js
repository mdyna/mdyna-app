import { connect } from 'react-redux';
import App from 'Components/App';
import ACTIONS from 'Store/actions/';
import { convertToTime } from 'Utils/dates';
import {
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  SORTING_BY_TITLE,
} from 'Utils/globals';

const { SETTINGS, FILTERS } = ACTIONS;

const { toggleSidebar, toggleEditor, toggleSettings } = SETTINGS;

const {
  searchCards,
  addLabelFilter,
  removeLabelFilter,
  focusCard,
  changeSorting,
  toggleCompletedFilter,
} = FILTERS;

function mapDispatchToProps(dispatch) {
  return {
    toggleSettings: () => {
      dispatch(toggleSettings());
    },
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    focusCard: () => {
      dispatch(focusCard(false));
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
    changeSorting: (sorting, order) => {
      dispatch(changeSorting(sorting, order));
    },
    toggleCompletedFilter: (val) => {
      dispatch(toggleCompletedFilter(val));
    },
    addLabelFilter: (val) => {
      dispatch(addLabelFilter(val));
    },
    removeLabelFilter: (val) => {
      dispatch(removeLabelFilter(val));
    },
  };
}

function sortCards(cards, sorting, order) {
  const sortingType = `${sorting}-${order}`;
  switch (sortingType) {
    case `${SORTING_BY_DATE}-${DESCENDING_ORDER}`:
      return cards.sort(
        (a, b) => convertToTime(b[sorting]) - convertToTime(a[sorting]),
      );
    case `${SORTING_BY_DATE}-${ASCENDING_ORDER}`:
      return cards.sort(
        (a, b) => convertToTime(a[sorting]) - convertToTime(b[sorting]),
      );
    case `${SORTING_BY_TITLE}-${ASCENDING_ORDER}`:
      return cards.sort((a, b) => a.title.localeCompare(b.title));
    case `${SORTING_BY_TITLE}-${DESCENDING_ORDER}`:
      return cards.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return cards.sort(
        (a, b) => convertToTime(b[sorting]) - convertToTime(a[sorting]),
      );
  }
}

function mapStateToProps(state) {
  const cards = state.filters.isFocused
    ? [state.filters.focusedCard]
    : sortCards(
      state.cards,
      (state.filters && state.filters.sorting) || SORTING_BY_DATE,
      (state.filters && state.filters.order) || DESCENDING_ORDER,
    );

  return {
    searchInput: state.filters.searchInput,
    isFocused: state.filters.isFocused,
    labelFilters: state.filters.labelFilters,
    completedFilterOn: state.filters.completedFilterOn,
    sidebarExpanded: state.style.sidebarExpanded,
    modalOpen: state.editor.toggleEditor,
    settingsModal: state.settings.settingsModal,
    sorting: state.filters.sorting || SORTING_BY_DATE,
    order: state.filters.order || DESCENDING_ORDER,
    labels: state.labels,
    whiteMode: state.style.whiteMode,
    cards,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
