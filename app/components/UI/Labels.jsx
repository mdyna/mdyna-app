import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Labels extends Component {
  render() {
    const { labels, color, label } = this.props;
    return label ? (
      <span
        style={{
          color: label.color || color,
          backgroundColor: '#333333AA',
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
                backgroundColor: '#333333AA',
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
    )
  }
}

export default Labels;

Labels.propTypes = {
  labels: PropTypes.array,
  color: PropTypes.string,
  label: PropTypes.object,
};

Labels.defaultProps = {
  color: '#1de9b6',
  label: null,
  labels: [],
};
