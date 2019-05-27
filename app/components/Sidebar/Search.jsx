import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TextInput from 'grommet/components/TextInput';
import SearchIcon from 'grommet/components/icons/base/Search';

import './Search.scss';

export default class Search extends Component {
  render() {
    const {
      searchInput, onChange, searchBar, whiteMode,
    } = this.props;
    return (
      <div className={cx('search-wrapper', whiteMode && 'white-mode')}>
        <SearchIcon />
        <TextInput
          className={cx('mdyna-search', whiteMode && 'white-mode')}
          placeHolder="Search cards by title (Ctrl+P)"
          onDOMChange={e => onChange(e.target.value)}
          ref={searchBar}
          onSelect={e => onChange(e.suggestion)}
          value={searchInput}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  searchBar: PropTypes.object.isRequired,
  whiteMode: PropTypes.bool,
};

Search.defaultProps = {
  searchInput: '',
  whiteMode: false,
};
