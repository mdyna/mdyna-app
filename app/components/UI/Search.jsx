import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TextInput } from 'grommet';
import { Search } from 'grommet-icons';

import './Search.scss';

export default class SearchComponent extends PureComponent {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    defaultValue: this.props.searchInput || '',
  };

  render() {
    const {
      searchInput, onChange, searchBar, titles, hidden,
    } = this.props;
    const { defaultValue } = this.state;
    return (
      <div className={cx(hidden && 'hidden', 'search-wrapper')}>
        <Search color="brand" />
        <TextInput
          className="mdyna-search"
          suggestions={titles}
          placeholder="Search cards (Ctrl+P)"
          onChange={(e) => {
            this.setState({ defaultValue: e.target.value });
            onChange(e.target.value);
          }}
          ref={searchBar}
          onSelect={(e) => {
            this.setState({ defaultValue: e.suggestion });
            onChange(e.suggestion);
          }}
          defaultValue={searchInput}
          value={defaultValue}
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
