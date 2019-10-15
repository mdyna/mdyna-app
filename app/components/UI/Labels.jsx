import React, { Component } from 'react';
import tc from 'tinycolor2';
import PropTypes from 'prop-types';

class Labels extends Component {
  renderLabelText(label) {
    const {
      color, transparent, labelFuncs, labelFilters,
    } = this.props;
    if (labelFuncs && labelFilters) {
      const { addLabelFilter, removeLabelFilter } = labelFuncs;
      const labelFilterActive = label && label.title && labelFilters.indexOf(label.title) !== -1;
      const labelFunc = labelFilterActive ? removeLabelFilter : addLabelFilter;
      /* eslint-disable */
      return (
        <span
          style={{
            color: labelFilterActive ? tc(color).darken(15) : color,
            border: labelFilterActive && `2px solid ${tc(color).darken(15)}`,
            backgroundColor: !transparent && '#333333AA',
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '5px',
          }}
          role="button"
          key={`label-${label.title || label}`}
          onClick={() => labelFunc(label.title)}
        >
          {label.title || label}
        </span>
      );
      /* eslint-enable */
    }
    return (
      <span
        style={{
          color,
          backgroundColor: !transparent && '#333333AA',
          borderRadius: '10px',
          padding: '5px',
        }}
        key={`label-${label.title || label}`}
      >
        {label.title || label}
      </span>
    );
  }

  render() {
    const { labels, label } = this.props;
    return label ? (
      this.renderLabelText(label)
    ) : (
      <div
        className="labels"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
        {labels && labels.length
          ? labels.map(arrayLabel => this.renderLabelText(arrayLabel))
          : ''}
      </div>
    );
  }
}

export default Labels;

Labels.propTypes = {
  labels: PropTypes.array,
  transparent: PropTypes.bool,
  color: PropTypes.string,
  labelFuncs: PropTypes.object,
  labelFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.object,
};

Labels.defaultProps = {
  color: '#000',
  labelFilters: [],
  labelFuncs: null,
  label: null,
  transparent: false,
  labels: [],
};
