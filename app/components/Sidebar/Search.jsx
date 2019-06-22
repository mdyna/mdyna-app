import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TextInput} from 'grommet';
import {Search} from 'grommet-icons';

import './Search.scss';

export default class SearchComponent extends Component {
  render() {
    const {
      searchInput, onChange, searchBar, whiteMode,
    } = this.props;
    return (
      <div className={cx('search-wrapper', whiteMode && 'white-mode')}>
        <Search />
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

SearchComponent.propTypes = {
  searchInput: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  searchBar: PropTypes.object.isRequired,
  whiteMode: PropTypes.bool,
};

SearchComponent.defaultProps = {
  searchInput: '',
  whiteMode: false,
};
