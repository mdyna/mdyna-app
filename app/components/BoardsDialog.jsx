import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { RIEInput } from 'riek';
import {
  Add, Projects, Edit, Trash,
} from 'grommet-icons';
import { toast } from 'react-toastify';
import ErrorBoundary from 'UI/Error';
import Tooltip from 'UI/Tooltip';
import Button from 'UI/Button';

import './BoardsDialog.scss';

class BoardsDialog extends PureComponent {
  getBoardId(boardName) {
    const { boards } = this.props;
    if (boardName === 'INBOX') {
      return 'INBOX';
    }
    const boardIds = Object.keys(boards);
    for (let i = 0; i < boardIds.length; i += 1) {
      const boardId = boardIds[i];
      if (boardName === boards[boardId].name) {
        return boardId;
      }
    }
    return 'INBOX';
  }

  renderBoardsTable() {
    const {
      boardNames,
      deleteBoard,
      activeBoard,
      changeBoardName,
      changeActiveBoard,
      boards,
    } = this.props;
    return (
      <Box className="boards-table" direction="column">
        {boardNames.map(board => (
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
                editProps={{
                  defaultValue: board || '',
                }}
                value={(
                  <Text>
                    {board}
                    <Edit color="brand" />
                  </Text>
)}
                change={(newName) => {
                  const boardId = this.getBoardId(board);
                  if (activeBoard === boardId) {
                    changeActiveBoard(boardId);
                  }
                  changeBoardName(boardId, newName.board);
                }}
              />
            ) : (
              board
            )}
            <Button onClick={() => changeActiveBoard(this.getBoardId(board))}>
              <Projects
                color={
                  (activeBoard === this.getBoardId(board) && 'accent-3')
                  || 'brand'
                }
              />
            </Button>
            {board !== 'INBOX' && (
              <Button
                onClick={() => {
                  const boardId = this.getBoardId(board);
                  if (activeBoard === boardId) {
                    changeActiveBoard('INBOX');
                  }
                  deleteBoard(boardId);
                }}
              >
                <Trash color="brand" />
              </Button>
            )}
          </Box>
        ))}
      </Box>
    );
  }

  render() {
    const { toggleBoardsDialog, createBoard } = this.props;
    return (
      <Box className="boards-dialog" direction="column" background="dark-2">
        <Box direction="row" align="center" justify="between">
          <Text size="xlarge">
            <Projects color="brand" />
            Boards
          </Text>
          {toggleBoardsDialog && (
            <Button
              color="accent-2"
              className="discard-btn"
              hoverIndicator="accent-2"
              onClick={() => toggleBoardsDialog()}
            >
              X
            </Button>
          )}
        </Box>
        {this.renderBoardsTable()}
        <Box direction="row" align="center">
          <RIEInput
            className="board-input add-board"
            classEditing="editing-board"
            change={value => createBoard(value.name)}
            editProps={{
              defaultValue: '',
            }}
            value={(
              <Text>
                Add board
                {' '}
                <Add color="brand" />
              </Text>
)}
            propName="name"
          />
        </Box>
      </Box>
    );
  }
}

BoardsDialog.propTypes = {
  changeActiveBoard: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  boards: PropTypes.object.isRequired,
  activeBoard: PropTypes.string,
  toggleBoardsDialog: PropTypes.func,
  createBoard: PropTypes.func.isRequired,
  boardNames: PropTypes.array.isRequired,
  changeBoardName: PropTypes.func.isRequired,
};

BoardsDialog.defaultProps = {
  toggleBoardsDialog: null,
  activeBoard: 'INBOX',
};

export default BoardsDialog;
