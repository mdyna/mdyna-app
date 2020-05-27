import React, { PureComponent } from 'react';
// eslint-disable-next-line
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import { Collapsible, Box } from 'grommet';
import {
  Up,
  Ascend,
} from 'grommet-icons';
import classnames from 'classnames';
import Button from 'UI/Button';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from 'Utils/globals';

import './SortingCollapsible.scss';

class SortingCollapsible extends PureComponent {
  state = {
    sortingOptionsExpanded: false,
  };

  getSortingOrder = (targetSorting) => {
    const { sorting, order } = this.props;
    const activeSorting = sorting;
    if (targetSorting === activeSorting) {
      return order === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    }
    return ASCENDING_ORDER;
  };

  expandSortingOptions() {
    const { sortingOptionsExpanded } = this.state;
    this.setState({
      sortingOptionsExpanded: !sortingOptionsExpanded,
    });
  }

  render() {
    const {
      changeSorting,
      order,
      sorting,
    } = this.props;
    const {
      sortingOptionsExpanded,
    } = this.state;
    return (
      <Box direction="column">
        <Button hoverIndicator="accent-1" onClick={() => this.expandSortingOptions()}>
          <Ascend color="brand" />
          {' '}
Sort Cards
        </Button>
        <Collapsible direction="vertical" open={sortingOptionsExpanded}>
          <Button
            color={(sorting === SORTING_BY_TITLE && 'accent-3') || 'brand'}
            hoverIndicator="accent-1"
            onClick={() => changeSorting(
              SORTING_BY_TITLE,
              this.getSortingOrder(SORTING_BY_TITLE),
            )
        }
          >
            <Up
              color={(sorting === SORTING_BY_TITLE && 'accent-3') || 'brand'}
              className={classnames(
                order === DESCENDING_ORDER && 'descending',
              )}
            />
        By Title
          </Button>
          <Button
            hoverIndicator="accent-1"
            onClick={() => changeSorting(
              SORTING_BY_DATE,
              this.getSortingOrder(SORTING_BY_DATE),
            )
        }
            color={(sorting === SORTING_BY_DATE && 'accent-3') || 'brand'}
          >
            <Up
              color={(sorting === SORTING_BY_DATE && 'accent-3') || 'brand'}
              className={classnames(
                order === DESCENDING_ORDER && 'descending',
              )}
            />
        By Date
          </Button>
        </Collapsible>
      </Box>
    );
  }
}

SortingCollapsible.whyDidYouRender = true;

SortingCollapsible.propTypes = {
  changeSorting: PropTypes.func.isRequired,
  order: PropTypes.string,
  sorting: PropTypes.string,
};

SortingCollapsible.defaultProps = {
  order: DESCENDING_ORDER,
  sorting: SORTING_BY_DATE,
};

export default SortingCollapsible;
