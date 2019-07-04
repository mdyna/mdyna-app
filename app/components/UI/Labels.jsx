import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Labels extends Component {
  render() {
    const {
      labels, color, label, transparent,
    } = this.props;
    return label ? (
      <span
        style={{
          color,
          backgroundColor: !transparent && '#333333AA',
          borderRadius: '50px',
          padding: '5px',
        }}
        key={`label-${label.title || label}`}
      >
        {label.title || label}
      </span>
    ) : (
      <div
        className="labels"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
        {labels && labels.length
          ? labels.map(arrayLabel => (
            <span
              style={{
                color,
                backgroundColor: !transparent && '#333333AA',
                borderRadius: '50px',
                padding: '5px',
              }}
              key={`label-${arrayLabel.title || arrayLabel}`}
            >
              {arrayLabel.title || arrayLabel}
            </span>
          ))
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
  label: PropTypes.object,
};

Labels.defaultProps = {
  color: '#000',
  label: null,
  transparent: false,
  labels: [],
};
