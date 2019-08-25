import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TextInput } from 'grommet';
import { Search } from 'grommet-icons';

import './Search.scss';

export default class SearchComponent extends Component {
  render() {
    const {
 searchInput, onChange, searchBar, titles, hidden 
} = this.props;
    return (
      <div className={cx(hidden && 'hidden', 'search-wrapper')}>
        <Search color="brand" />
        <TextInput
          className="mdyna-search"
          placeholder="Search cards (Ctrl+P)"
          onChange={e => onChange(e.target.value)}
          ref={searchBar}
          onSelect={e => onChange(e.suggestion)}
          defaultValue={searchInput}
        />
      </div>
    );
  }
}

SearchComponent.propTypes = {
  searchInput: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  searchBar: PropTypes.object,
  titles: PropTypes.array,
};

SearchComponent.defaultProps = {
  titles: [],
  hidden: false,
  searchInput: '',
  searchBar: null,
};
