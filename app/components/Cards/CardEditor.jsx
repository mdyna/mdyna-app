import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import tinycolor from 'tinycolor2';
import { Box } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Labels from 'UI/Labels';
import Button from 'UI/Button';

class CardEditor extends PureComponent {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    editingColor: this.props.card.color || '',
    // eslint-disable-next-line react/destructuring-assignment
    editingLabels: this.props.card.labels || [],
  };

  name = 'Card Editor';

  render() {
    const { card, onSubmit, onDiscard } = this.props;
    const { editingColor, editingLabels } = this.state;

    return (
      <Box direction="row" justify="evenly">
        <Button
          hoverIndicator={false}
          color="accent-3"
          onClick={() => onSubmit({
            ...card,
            color: editingColor,
            labels: editingLabels,
          })
          }
        >
          Submit
          <Checkmark color="accent-3" size="18px" />
        </Button>
        <Button
          hoverIndicator={false}
          color="accent-2"
          onClick={() => onDiscard()}
        >
          Discard
          <Close color="accent-2" size="18px" />
        </Button>
      </Box>
    );
  }
}

export default CardEditor;

CardEditor.propTypes = {
  card: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

CardEditor.defaultProps = {};
