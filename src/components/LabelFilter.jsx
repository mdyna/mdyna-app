import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy';
import Filter from 'grommet/components/icons/base/Filter';
import Button from 'grommet/components/Button';

import '!style-loader!css-loader!sass-loader!./LabelFilter.scss'; // eslint-disable-line
class LabelFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  renderClickableLabels() {
    const { labels, onSelect } = this.props;
    const orderedLabels = sort(labels, d => d.count);
    const clickableLabels = [];
    for (let i = 0; i < 10; i += 1) {
      const label = orderedLabels[i];
      if (label && label.title) {
        const labelElement = (
          <Button
            className="label-button"
            onClick={() => onSelect(label)}
            key={`key-${i}`}
          >
            <span
              className="label"
            >
              {label.title}
            </span>
          </Button>
        );
        clickableLabels.push(labelElement);
      }
    }
    return clickableLabels.reverse();
  }
  render() {
    return (
      <div className="label-filter-box">
        <Filter />
        <div
          className="label-box"
        >
          {this.renderClickableLabels()}
        </div>
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
