import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextInput from 'grommet/components/TextInput';

export default class Search extends Component {
  render() {
    const {
      titles, searchInput, onChange, searchBar,
    } = this.props;
    return (
      <Fragment>
        <TextInput
          placeHolder="Search cards by title (Ctrl+P)"
          suggestions={titles.filter(d => d && d.toLowerCase().includes(searchInput.toLowerCase()))}
          onDOMChange={e => onChange(e)}
          ref={searchBar}
          onSelect={e => onChange(e.suggestion)}
          value={searchInput}
        />
      </Fragment>
    );
  }
}

Search.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  searchInput: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  searchBar: PropTypes.object.isRequired,
};

Search.defaultProps = {
  searchInput: '',
  titles: [],
};
