import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { Box, Text } from 'grommet';
import { RIEInput } from 'riek';
import cx from 'classnames';
import {
  Add, Projects, Edit, Trash,
} from 'grommet-icons';
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
    const { toggleBoardsDialog, createBoard, boardNames } = this.props;
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
