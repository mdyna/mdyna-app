import React, { Component } from 'react';
import tc from 'tinycolor2';
import PropTypes from 'prop-types';

export const Label = ({
  onClick, color, label, transparent,
}) => (
  <span
    style={{
      color,
      backgroundColor: !transparent && '#333333AA',
      borderRadius: '10px',
      margin: '0 5px',
      cursor: 'pointer',
      padding: '5px',
    }}
    tabIndex={-1}
    role="button"
    onClick={onClick}
  >
    {label}
  </span>
);

Label.defaultProps = {
  color: '#000',
  transparent: false,
  onClick: null,
  label: '',
};
Label.propTypes = {
  onClick: PropTypes.func,
  transparent: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
};
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
            // TODO: Use styled components or scss to convert do these
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
          width: '75%',
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
