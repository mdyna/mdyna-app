import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Archive, Trash, Edit, More, Clone,
} from 'grommet-icons';
import { Menu, Box } from 'grommet';
import FocusIcon from 'UI/FocusIcon';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import { toast } from 'react-toastify';

import './CardBar.scss'; // eslint-disable-line

class CardBar extends PureComponent {
  state = {
    moreExpanded: false,
  };

  handleLabels(removeLabelFunc) {
    const { card } = this.props;
    const { labels } = card;
    if (labels && labels.length) {
      labels.forEach((label) => {
        removeLabelFunc(label);
      });
    }
  }

  removeCard(card, removeCardFunc, removeLabelFunc) {
    this.handleLabels(removeLabelFunc);
    removeCardFunc(card);
  }

  render() {
    const {
      card, cardActions, isFocused, color,
    } = this.props;
    const { moreExpanded } = this.state;
    const {
      editCard, toggleCard, removeCard, focusCard,
    } = cardActions;
    return (
      <React.Fragment>
        <div className="card-bar">
          {cardActions && (
            <div className="buttons-container">
              <Button
                active={card.isEditing}
                hoverIndicator="dark-1"
                onClick={() => !card.isEditing && editCard(card, isFocused)}
              >
                <Tooltip
                  icon={<Edit color={card.isEditing ? 'brand' : color} />}
                  text="Edit this card (You can also double click the card)"
                />
              </Button>
              <Button
                hoverIndicator="dark-1"
                onClick={() => this.removeCard(card, removeCard, cardActions.removeLabel)
                }
              >
                <Tooltip
                  icon={(
                    <Trash
                      style={{
                        stroke: color,
                      }}
                      color={color}
                    />
)}
                  text="Delete card (Permanent)"
                />
              </Button>
              <Menu
                open={moreExpanded}
                dropBackground="dark-1"
                items={[
                  {
                    label: (
                      <Box
                        style={{ minWidth: '100px' }}
                        align="center"
                        wrap={false}
                        direction="row"
                        justify="between"
                      >
                        <Archive color={color} />
                        Archive
                      </Box>
                    ),
                    onClick: () => toggleCard(card),
                  },
                  {
                    label: (
                      <Box
                        style={{ minWidth: '100px' }}
                        align="center"
                        wrap={false}
                        direction="row"
                        justify="between"
                      >
                        <FocusIcon color={isFocused ? null : color} />
                        Focus
                      </Box>
                    ),
                    onClick: () => {
                      focusCard(isFocused ? null : card);
                      if (!isFocused) {
                        toast.info('Press ESC to show all cards');
                      }
                    },
                  },
                  {
                    label: (
                      <Box
                        style={{ minWidth: '100px' }}
                        align="center"
                        wrap={false}
                        direction="row"
                        justify="between"
                      >
                        <Clone color={color} />
                        Duplicate
                      </Box>
                    ),
                  },
                ]}
                icon={<More color={color} />}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  isFocused: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};
