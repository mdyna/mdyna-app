import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './CardItem';

class cardPreview extends Component {
  render() {
    const { card, changeCardSetting } = this.props;
    return <NoteItem className="card-preview" changeCardSetting={changeCardSetting} card={card} showAllText />;
  }
}

export default cardPreview;

cardPreview.propTypes = {
  card: PropTypes.object,
  changeCardSetting: PropTypes.func.isRequired,
};

cardPreview.defaultProps = {
  card: {},
};
