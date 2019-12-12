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
      onChange, searchBar, titles, hidden,
    } = this.props;
    const { defaultValue } = this.state;
    const getSuggestions = () => {
      const suggestions = [];
      for (let i = 0; i < titles.length; i += 1) {
        const title = titles[i];
        if (title && title.toLowerCase) {
          if (title.toLowerCase().startsWith(defaultValue.toLowerCase())) {
            suggestions.push(title);
          }
        }
      }
      if (suggestions.length) {
        suggestions.length = 5;
      }
      return !defaultValue ? [] : suggestions;
    };
    return (
      <div className={cx(hidden && 'hidden', 'search-wrapper')}>
        <Search color="brand" />
        <TextInput
          className="mdyna-search"
          suggestions={hidden ? [] : getSuggestions()}
          placeholder="Search cards (Ctrl+P)"
          onChange={(e) => {
            if (!hidden) {
              this.setState({ defaultValue: e.target.value });
              onChange(e.target.value);
            }
          }}
          ref={searchBar}
          onSelect={(e) => {
            if (!hidden) {
              this.setState({ defaultValue: e.suggestion });
              onChange(e.suggestion);
            }
          }}
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
