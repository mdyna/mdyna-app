import { connect } from 'react-redux';
import cardPreview from '../components/Cards/CardPreview';

function mapStateToProps(state) {
  return {
    card: state.editor,
  };
}
export default connect(mapStateToProps)(cardPreview);
