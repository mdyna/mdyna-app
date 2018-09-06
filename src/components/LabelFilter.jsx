import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from 'grommet/components/icons/base/Filter';
import Button from 'grommet/components/Button';
import classnames from 'classnames';

import '!style-loader!css-loader!sass-loader!./Nav.scss'; // eslint-disable-line
class LabelFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }
  render() {
    const { labels } = this.props;
    return (
      <div className="label-filter">
        <Filter/>

      </div>
    );
  }
}

LabelFilter.propTypes = {
  onSelect: PropTypes.func,
  labels: PropTypes.array,
};

LabelFilter.defaultProps = {
  labels: [],
  onSelect: () => console.log('selected'),
};

export default LabelFilter;
