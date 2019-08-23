import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Text, Form, FormField,
} from 'grommet';
import { RIEInput } from 'riek';
import { Add, Projects } from 'grommet-icons';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';

import './BoardsDialog.scss';

class BoardsDialog extends PureComponent {
  renderBoardsTable() {
    const { boards, deleteBoard, changeBoardName } = this.props;

    console.log('rendering boards table');
    return (
      <Box className="boards-table" direction="column">
        {boards.map(board => (
          <Box
            direction="row"
            key={`${board}-board-row`}
            className="boards-row"
          >
            {board !== 'INBOX' ? (
              <RIEInput
                propName="board"
                className="board-input"
                classEditing="editing-board"
                value={board}
                change={newName => changeBoardName(board, newName.board)}
              />
            ) : (
              board
            )}
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
        <Box direction="row" align="center">
          <Text size="large">
            Current Boards
            <Projects color="brand" />
          </Text>
          <Button
            color="accent-2"
            className="discard-btn"
            hoverIndicator="accent-2"
            onClick={() => toggleBoardsDialog()}
          >
            X
          </Button>
        </Box>
        {this.renderBoardsTable()}
        <Box direction="row" align="center">
          <RIEInput
            placeholder="Add a board"
            className="board-input add-board"
            classEditing="editing-board"
            change={value => createBoard(value.name)}
            value="Add a board"
            propName="name"
          />
        </Box>
      </Box>
    );
  }
}

BoardsDialog.propTypes = {
  toggleBoardsDialog: PropTypes.func,
  createBoard: PropTypes.func.isRequired,
};

BoardsDialog.defaultProps = {
  toggleBoardsDialog: null,
};

export default BoardsDialog;
