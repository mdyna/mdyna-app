import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Text, Form, FormField,
} from 'grommet';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';

import './BoardsDialog.scss';

class BoardsDialog extends PureComponent {
  renderBoardsTable() {
    const { boards, deleteBoard } = this.props;

    console.log('rendering boards table');
    return (
      <Box className="boards-table" direction="column">
        {boards.map(board => (
          <Box
            direction="row"
            key={`${board}-board-row`}
            className="boards-row"
          >
            {board}
            {board !== 'INBOX' && (
              <Button onClick={() => deleteBoard(board)}>X</Button>
            )}
          </Box>
        ))}
      </Box>
    );
  }

  render() {
    const { toggleBoardsDialog, createBoard } = this.props;
    return (
      <Box className="boards-dialog" direction="column">
        <Button
          color="accent-2"
          className="discard-btn"
          hoverIndicator="accent-2"
          onClick={() => toggleBoardsDialog()}
        >
          X
        </Button>
        {this.renderBoardsTable()}
        <Form onSubmit={({ value }) => createBoard(value.name)}>
          <FormField name="name" label="Add a board" />
          <Button type="submit" label="Add" />
        </Form>
      </Box>
    );
  }
}

BoardsDialog.propTypes = {
  toggleBoardsDialog: PropTypes.func,
};

BoardsDialog.defaultProps = {
  toggleBoardsDialog: null,
};

export default BoardsDialog;
