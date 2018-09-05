import { connect } from 'react-redux';
import App from '../components/App';
import { toggleWhiteMode, toggleEditor, searchCards } from '../store/actions/';


function getCardTitles(cards) {
  return cards && cards.map(d => d.title) || '';
}

function mapDispatchToProps(dispatch) {
  return {
    toggleWhiteMode: () => {
      dispatch(toggleWhiteMode());
    },
    toggleEditor: () => {
      dispatch(toggleEditor());
    },
    searchCards: (val) => {
      dispatch(searchCards(val));
    },
  };
}
function mapStateToProps(state) {
  return {
    searchInput: state.filters.searchInput,
    whiteMode: state.style.whiteMode,
    titles: [
      ...getCardTitles(state.notes),
      ...getCardTitles(state.tasks.daily),
      ...getCardTitles(state.tasks.weekly),
      ...getCardTitles(state.tasks.monthly),
    ],
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
