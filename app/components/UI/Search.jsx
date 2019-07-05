import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput } from "grommet";
import { Search } from "grommet-icons";

import "./Search.scss";

export default class SearchComponent extends Component {
  render() {
    const { searchInput, onChange, searchBar, titles } = this.props;
    return (
      <div className="search-wrapper">
        <Search color="brand" />
        <TextInput
          suggestions={titles}
          className="mdyna-search"
          placeholder="Search cards (Ctrl+P)"
          onChange={e => onChange(e.target.value)}
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
  titles: PropTypes.array
};

SearchComponent.defaultProps = {
  titles: []
};
