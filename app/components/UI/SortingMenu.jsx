import React, { PureComponent } from 'react';
// eslint-disable-next-line
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import {
  Box, Menu, Text,
} from 'grommet';
import { Up, Ascend } from 'grommet-icons';
import classnames from 'classnames';
import {
  SORTING_BY_TITLE,
  SORTING_BY_DATE,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
} from 'Utils/globals';


class SortingMenu extends PureComponent {
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
    const { changeSorting, order, sorting } = this.props;
    const iconStyle = {
      transition: 'all 0.5s',
      transform: order === DESCENDING_ORDER ? 'rotate(180deg)' : 'rotate(0deg)',
      verticalAlign: 'middle',
      margin: '0 5px',
    };
    return (
      <Box direction="column" wrap={false}>
        <Menu
          justifyContent="center"
          dropBackground="dark-2"
          icon={<Ascend color="brand" />}
          label={<Text color="brand" weight="bold">Sort</Text>}
          dropAlign={{ top: 'bottom' }}
          items={[
            {
              onClick: () => changeSorting(
                SORTING_BY_TITLE,
                this.getSortingOrder(SORTING_BY_TITLE),
              ),
              label: (
                <Text>
                  <Up
                    style={
                      iconStyle
                    }
                    color={
                      (sorting === SORTING_BY_TITLE && 'accent-3') || 'brand'
                    }
                    className={classnames(
                      order === DESCENDING_ORDER && 'descending',
                    )}
                  />
                  By Title
                </Text>
              ),
            },
            {
              onClick: () => changeSorting(
                SORTING_BY_DATE,
                this.getSortingOrder(SORTING_BY_DATE),
              ),
              label: (
                <Text>
                  <Up
                    style={
                      iconStyle
                    }
                    color={
                      (sorting === SORTING_BY_DATE && 'accent-3') || 'brand'
                    }
                    className={classnames(
                      order === DESCENDING_ORDER && 'descending',
                    )}
                  />
                  By Date
                </Text>
              ),
            },
          ]}
        />
      </Box>
    );
  }
}

SortingMenu.whyDidYouRender = true;

SortingMenu.propTypes = {
  changeSorting: PropTypes.func.isRequired,
  order: PropTypes.string,
  sorting: PropTypes.string,
};

SortingMenu.defaultProps = {
  order: DESCENDING_ORDER,
  sorting: SORTING_BY_DATE,
};

export default SortingMenu;
