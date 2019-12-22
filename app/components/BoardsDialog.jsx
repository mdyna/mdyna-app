/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { Box, Text } from 'grommet';
import { RIEInput } from 'riek';
import cx from 'classnames';
import { Add, Edit, Trash } from 'grommet-icons';
import BoardsIcon from 'UI/BoardsIcon';
import Error from 'UI/Error';
import Button from 'UI/Button';

import './BoardsDialog.scss';

export const validateBoards = (value, boardNames) => {
  if (value) {
    if (boardNames.indexOf(value) !== -1) {
      return Error.throwError(`There already exists a "${value}" board`);
    }
  } else {
    return Error.throwError('You must choose a board name');
  }
  return true;
};

class BoardsDialog extends PureComponent {
  state = {
    errorId: 0,
    error: false,
    // eslint-disable-next-line
    deletionStages: {},
  };

  getError(componentName) {
    if (componentName) {
      this.setState({
        error: componentName,
        errorId: uniqid(),
      });
    } else {
      this.setState({
        error: false,
      });
    }
  }

  getBoardId(boardName) {
    const { boards } = this.props;
    if (boardName === 'INBOX') {
      return 'INBOX';
    }
    for (let i = 0; i < boards.length; i += 1) {
      const board = boards[i];
      if (board && boardName === board.name) {
        return board.id;
      }
    }
    return 'INBOX';
  }

  deleteBoard(board, keepCards) {
    const { activeBoard, deleteBoard, changeActiveBoard } = this.props;
    const boardId = this.getBoardId(board);
    if (activeBoard === boardId) {
      changeActiveBoard('INBOX');
    }
    deleteBoard(boardId, keepCards);
  }

  updateDeletionStage(board) {
    const { deletionStages } = this.state;
    const boardDeletionStage = deletionStages[board];
    const newDeletionStages = {
      ...deletionStages,
      [board]: boardDeletionStage === 1 ? 0 : 1,
    };

    this.setState({ deletionStages: newDeletionStages });
  }

  renderDeletionFunnel(board) {
    const { deletionStages } = this.state;
    if (deletionStages[board] === undefined) {
      this.setState({
        deletionStages: {
          ...deletionStages,
          [board]: 0,
        },
      });
    }
    const boardDeletionStage = deletionStages[board];
    switch (boardDeletionStage) {
      default:
        return (
          <Button onClick={() => this.updateDeletionStage(board)}>
            <Trash color="accent-2" />
          </Button>
        );
      case 1:
        return (
          <Box direction="row" className="board-deletion-confirmation">
            <Button
              color="accent-2"
              hoverIndicator="accent-2"
              onClick={() => {
                this.deleteBoard(board, true);
                this.updateDeletionStage(board);
              }}
            >
              Keep Cards
            </Button>

            <Button
              color="accent-2"
              hoverIndicator="accent-2"
              onClick={() => {
                this.deleteBoard(board, false);
                this.updateDeletionStage(board);
              }}
            >
              Discard Cards
            </Button>

            <Button
              hoverIndicator="brand"
              onClick={() => this.updateDeletionStage(board)}
            >
              Cancel
            </Button>
          </Box>
        );
    }
  }

  renderBoardsTable() {
    const {
      boardNames,
      activeBoard,
      changeBoardName,
      changeActiveBoard,
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
                className={cx(
                  'board-input',
                  // eslint-disable-next-line react/destructuring-assignment
                  board === this.state.error && 'error-input',
                )}
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
                  if (validateBoards(newName.board, boardNames)) {
                    const boardId = this.getBoardId(board);
                    if (activeBoard === boardId) {
                      changeActiveBoard(boardId);
                    }
                    changeBoardName(boardId, newName.board);
                  } else {
                    this.getError(board);
                  }
                }}
              />
            ) : (
              board
            )}
            <Button onClick={() => changeActiveBoard(this.getBoardId(board))}>
              <BoardsIcon />
            </Button>
            {board !== 'INBOX' && this.renderDeletionFunnel(board)}
          </Box>
        ))}
      </Box>
    );
  }

  render() {
    const { toggleBoardsDialog, createBoard, boardNames } = this.props;
    return (
      <Box className="boards-dialog" direction="column" background="dark-2">
        <Box direction="row" align="center" justify="between">
          <Text size="xlarge">
            <BoardsIcon />
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
            className={cx(
              'board-input',
              'add-board',
              // eslint-disable-next-line react/destructuring-assignment
              this.state.error === 'add-board' && 'error-input',
            )}
            classEditing="editing-board"
            change={(value) => {
              if (validateBoards(value.name, boardNames)) {
                createBoard(value.name);
              } else {
                this.setState({ error: 'add-board' });
              }
            }}
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
  boards: PropTypes.array.isRequired,
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
