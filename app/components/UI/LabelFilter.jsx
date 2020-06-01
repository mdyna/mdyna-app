import React, { PureComponent } from 'react';
import { Box, Collapsible, Text } from 'grommet';
import { Tag } from 'grommet-icons';
import PropTypes from 'prop-types';
import sort from 'lodash/sortBy'; // eslint-disable-line
import Labels from 'UI/Labels';
import Button from 'UI/Button';

import './LabelFilter.scss'; // eslint-disable-line
class LabelFilter extends PureComponent {
  state = {
    expanded: false,
  }


  expandLabelFilters() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

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
    const orderedLabels = sort(labels, d => labelFilters.indexOf(d.title) !== -1, d => d.count).reverse();
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
            <Labels label={{ title: label.title }} transparent active={labelFilterActive} />
          </Button>
        );
        clickableLabels.push(labelElement);
      }
    }
    return clickableLabels;
  }

  renderClearBtn() {
    const { labelFilters } = this.props;
    return (
      <Button
        className="remove-btn"
        onClick={() => this.clearLabels()}
        color="accent-2"
      >
        {`Clear (${labelFilters.length})`}
      </Button>
    );
  }

  render() {
    const { labels, labelFilters } = this.props;
    const { expanded } = this.state;
    return (
      <Box direction="column" style={{ flex: 1 }}>
        <Button hoverIndicator="accent-1" onClick={() => this.expandLabelFilters()}>
          <Tag color="brand" />
          <Text color="brand">
        Label Filters
          </Text>
        </Button>
        {labelFilters && labelFilters.length && this.renderClearBtn() || ''}
        <Collapsible open={expanded} direction="vertical">
          {(labels && labels.length && (
          <>
            <div className="label-filter-box">
              <Box background="dark-1" className="label-box">
                {this.renderClickableLabels()}
              </Box>
            </div>
          </>
          ))
|| ''}
        </Collapsible>
      </Box>
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
