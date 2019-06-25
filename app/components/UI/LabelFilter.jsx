import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy';
import cx from 'classnames';
import Labels from 'UI/Labels';
import Button from 'UI/Button';

import './LabelFilter.scss'; // eslint-disable-line
class LabelFilter extends Component {
  renderClickableLabels() {
    const { labels, labelFilters, labelFilterFuncs, whiteMode } = this.props;
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
            className={cx('label-button', labelFilterActive && 'active')}
            onClick={() => labelFunc(label.title)}
            key={`key-${i}`}
          >
            <Labels label={{title: label.title, color: whiteMode ? '#33333' : '#1de9b6' }} />
          </Button>
        );
        clickableLabels.push(labelElement);
      }
    }
    return clickableLabels;
  }

  render() {
    const { whiteMode, labels } = this.props;
    return labels && labels.length && (
      <div className={cx(whiteMode && 'white-mode', 'label-filter-box')}>
        <div className="label-box">{this.renderClickableLabels()}</div>
      </div>
    ) || '';
  }
}

LabelFilter.propTypes = {
  whiteMode: PropTypes.bool,
  labelFilters: PropTypes.array,
  labelFilterFuncs: PropTypes.object.isRequired,
  labels: PropTypes.array,
};

LabelFilter.defaultProps = {
  whiteMode: false,
  labels: [],
  labelFilters: [],
};

export default LabelFilter;
