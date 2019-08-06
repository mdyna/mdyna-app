import React, { Component } from 'react';
import { Box } from 'grommet';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy';
import Labels from 'UI/Labels';
import Button from 'UI/Button';

import './LabelFilter.scss'; // eslint-disable-line
class LabelFilter extends Component {
  renderClickableLabels() {
    const { labels, labelFilters, labelFilterFuncs } = this.props;
    const { addLabelFilter, removeLabelFilter } = labelFilterFuncs;
    const orderedLabels = sort(labels, d => d.count).reverse();
    const clickableLabels = [];
    for (let i = 0; i < 10; i += 1) {
      const label = orderedLabels[i];
      const labelFilterActive = label && label.title && labelFilters.indexOf(label.title) !== -1;
      const labelFunc = labelFilterActive ? removeLabelFilter : addLabelFilter;
      if (label && label.title) {
        const labelElement = (
          <Button
            className="label-button"
            onClick={() => labelFunc(label.title)}
            key={`key-${i}`}
            color={(labelFilterActive && 'accent-3') || 'accent-1'}
            hoverIndicator="light-1"
            plain
            primary
          >
            <Labels label={{ title: label.title }} transparent />
          </Button>
        );
        clickableLabels.push(labelElement);
      }
    }
    return clickableLabels;
  }

  render() {
    const { labels } = this.props;
    return (
      (labels && labels.length && (
        <div className="label-filter-box">
          <Box border={{ color: 'brand' }} className="label-box">
            {this.renderClickableLabels()}
          </Box>
        </div>
      ))
      || ''
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
