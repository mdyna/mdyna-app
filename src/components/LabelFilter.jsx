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
    const { labels, labelFilters, labelFilterFuncs } = this.props;
    const { addLabelFilter, removeLabelFilter } = labelFilterFuncs;
    const orderedLabels = sort(labels, d => d.count);
    const clickableLabels = [];
    for (let i = 0; i < 10; i += 1) {
      const label = orderedLabels[i];
      const labelFilterActive = labelFilters.indexOf(label.title) !== -1;
      const labelFunc = labelFilterActive ? removeLabelFilter : addLabelFilter;
      const labelClassName = labelFilterActive ? 'label-button-active' : 'label-button';
      if (label && label.title) {
        const labelElement = (
          <Button
            className={labelClassName}
            onClick={() => labelFunc(label.title)}
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
  labelFilters: PropTypes.array,
  labelFilterFuncs: PropTypes.object.isRequired,
  labels: PropTypes.array,
};

LabelFilter.defaultProps = {
  labels: [],
  labelFilters: [],
};

export default LabelFilter;
