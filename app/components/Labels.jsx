import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

class Labels extends Component {
  render() {
    const { labels, color } = this.props;
    return (
      <div
        className="labels"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
        }}
      >
        {labels && labels.length
          ? labels.map(label => (
            <span
              style={{
                backgroundColor: tinycolor(color).lighten(10),
                border: `3px solid ${tinycolor(color).darken(30)}`,
                borderRadius: '50px',
                padding: '5px',
              }}
              key={`label-${label.title}`}
            >
              {label.title}
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
  color: PropTypes.string.isRequired,
};

Labels.defaultProps = {
  labels: [],
};
