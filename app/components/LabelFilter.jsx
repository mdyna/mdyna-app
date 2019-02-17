import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy';
import cx from 'classnames';
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
    const orderedLabels = sort(labels, d => d.count).reverse();
    const clickableLabels = [];
    for (let i = 0; i < 10; i += 1) {
      const label = orderedLabels[i];
      const labelFilterActive = label && label.title && labelFilters.indexOf(label.title) !== -1;
      const labelFunc = labelFilterActive ? removeLabelFilter : addLabelFilter;
      const labelClassName = labelFilterActive ? 'label-button-active' : 'label-button';
      if (label && label.title) {
        const labelElement = (
          <Button
            className={labelClassName}
            onClick={() => labelFunc(label.title)}
            key={`key-${i}`}
          >
            <span className="label">{label.title}</span>
          </Button>
        );
        clickableLabels.push(labelElement);
      }
    }
    return clickableLabels;
  }
  render() {
    const { whiteMode } = this.props;
    return (
      <div className={cx(whiteMode && 'white-mode', 'label-filter-box')}>
        <div className="label-box">{this.renderClickableLabels()}</div>
      </div>
    );
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
