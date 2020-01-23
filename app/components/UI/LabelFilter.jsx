import React, { Component } from 'react';
import { Box } from 'grommet';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy'; // eslint-disable-line
import Labels from 'UI/Labels';
import Button from 'UI/Button';

import './LabelFilter.scss'; // eslint-disable-line
class LabelFilter extends Component {
  clearLabels() {
    const { labelFilters, labelFilterFuncs } = this.props;
    const { removeLabelFilter } = labelFilterFuncs;
    for (let i = 0; i < labelFilters.length; i += 1) {
      const label = labelFilters[i];
      removeLabelFilter(label);
    }
  }

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
            primary
            color={!labelFilterActive ? 'brand' : 'accent-3'}
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
    const { labels, labelFilters } = this.props;
    return (
      (labels && labels.length && (
        <>
          {labelFilters && labelFilters.length && <Button className="remove-btn" onClick={() => this.clearLabels()} color="accent-2">{`Clear (${labelFilters.length})`}</Button> || ''}
          <div className="label-filter-box">
            <Box background="dark-1" className="label-box">
              {this.renderClickableLabels()}
            </Box>
          </div>
        </>
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
