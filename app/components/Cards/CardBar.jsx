import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Archive, Trash, Edit, MoreVertical, Clone, Copy, Pin,
} from 'grommet-icons';
import { Menu, Box } from 'grommet';
import FocusIcon from 'UI/FocusIcon';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

  renderExpandableMenu() {
    const { moreExpanded } = this.state;
    const {
      card, cardActions, isFocused, color,
    } = this.props;
    const {
      toggleCard,
      focusCard,
      duplicateCard,
    } = cardActions;
    return (
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
              <CopyToClipboard
                text={card.text}
                onCopy={() => toast.info(`${card.title} copied to clipboard`)
              }
              >
                <Box
                  style={{ minWidth: '100px' }}
                  align="center"
                  wrap={false}
                  direction="row"
                  justify="between"
                >
                  <Copy
                    style={{
                      stroke: color,
                    }}
                    color={color}
                  />
                Copy Text
                </Box>
              </CopyToClipboard>
            ),
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
            onClick: () => duplicateCard(card),
          },
        ]}
        icon={<MoreVertical color={color} />}
      />
    );
  }

  render() {
    const {
      card, cardActions, isFocused, color, isFaved,
    } = this.props;
    const {
      editCard,
      focusCard,
      favCard,
      removeCard,
    } = cardActions;
    return (
      <Box direction="row" wrap={false} className="card-bar" justify="between">
        {cardActions && (
        <Box direction="row">
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
          <Button hoverIndicator="dark-1" onClick={() => favCard(card)}>
            <Tooltip
              icon={<Pin color={(isFaved && 'brand') || color} />}
              text="Favorite card"
            />
          </Button>
          <Button hoverIndicator="dark-1" onClick={() => (isFocused ? focusCard() : focusCard(card))}>
            <FocusIcon color={isFocused ? null : color} />
          </Button>
          {this.renderExpandableMenu()}
        </Box>
        )}
      </Box>
    );
  }
}

export default CardBar;

CardBar.propTypes = {
  card: PropTypes.object.isRequired,
  isFaved: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  cardActions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
};
