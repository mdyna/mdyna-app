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
    deletionStage: [],
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

  updateDeletionStage(boardDeletionStage, index) {
    const { deletionStage } = this.state;
    const getNewDeletionStage = stage => deletionStage.map((s, i) => (i === index ? stage : s));
    if (boardDeletionStage) {
      this.setState({ deletionStage: getNewDeletionStage(0) });
    } else {
      this.setState({ deletionStage: getNewDeletionStage(1) });
    }
  }

  renderDeletionFunnel(board, index) {
    const { boardNames } = this.props;
    const { deletionStage } = this.state;
    if (!deletionStage || !deletionStage.length) {
      const newDeletionStages = [];
      for (let i = 0; i <= boardNames.length; i += 1) {
        if (boardNames[i] !== 'INBOX') {
          newDeletionStages.push(0);
        }
      }
      this.setState({
        deletionStage: newDeletionStages,
      });
    }
    const boardDeletionStage = deletionStage[index];
    switch (boardDeletionStage) {
      default:
        return (
          <Button
            onClick={() => this.updateDeletionStage(boardDeletionStage, index)}
          >
            <Trash color="accent-2" />
          </Button>
        );
      case 1:
        return (
          <Box direction="row">
            <Button
              onClick={() => {
                this.deleteBoard(board, true);
                this.updateDeletionStage(boardDeletionStage, index);
              }}
            >
              <Trash color="accent-2" />
              Keep Cards
            </Button>

            <Button
              onClick={() => {
                this.deleteBoard(board, false);
                this.updateDeletionStage(boardDeletionStage, index);
              }}
            >
              <Trash color="accent-2" />
              Discard Cards
            </Button>

            <Button
              onClick={() => this.updateDeletionStage(boardDeletionStage, index)
              }
            >
              {'< Back'}
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
        {boardNames.map((board, index) => (
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
            {board !== 'INBOX' && this.renderDeletionFunnel(board, index)}
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
