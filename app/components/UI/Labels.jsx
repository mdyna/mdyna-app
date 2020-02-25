import React, { Component } from 'react';
import tc from 'tinycolor2';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

export const Label = ({
  onClick, color, label, transparent, active,
}) => (
  <Text
    color={color || active && 'accent-2' || 'dark-1'}
    style={{
      backgroundColor: !transparent && '#333333AA',
      borderRadius: '10px',
      margin: '2px 5px',
      cursor: 'pointer',
      padding: '5px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
    tabIndex={-1}
    role="button"
    onClick={onClick}
  >
    {label}
  </Text>
);

Label.defaultProps = {
  color: '',
  transparent: false,
  onClick: null,
  active: false,
  label: '',
};
Label.propTypes = {
  onClick: PropTypes.func,
  transparent: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
};
class Labels extends Component {
  renderLabelText(label) {
    const {
      color, transparent, labelFuncs, labelFilters, active,
    } = this.props;
    if (labelFuncs && labelFilters) {
      const { addLabelFilter, removeLabelFilter } = labelFuncs;
      const labelFilterActive = label && label.title && labelFilters.indexOf(label.title) !== -1;
      const labelFunc = labelFilterActive ? removeLabelFilter : addLabelFilter;
      /* eslint-disable */
      return (
        <Text
          color={color || labelFilterActive && 'accent-2' || 'dark-1'}
          style={{
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
        </Text>
      );
      /* eslint-enable */
    }
    return (
      <Text
        color={color || active && 'accent-2' || 'dark-1'}
        style={{
          backgroundColor: !transparent && '#333333AA',
          borderRadius: '10px',
          padding: '5px',
        }}
        key={`label-${label.title || label}`}
      >
        {label.title || label}
      </Text>
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
  active: PropTypes.bool,
  transparent: PropTypes.bool,
  color: PropTypes.string,
  labelFuncs: PropTypes.object,
  labelFilters: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.object,
};

Labels.defaultProps = {
  color: '',
  labelFilters: [],
  labelFuncs: null,
  active: false,
  label: null,
  transparent: false,
  labels: [],
};
