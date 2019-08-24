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
  renderBoardsTable() {
    const {
      boards,
      deleteBoard,
      changeBoardName,
      changeActiveBoard,
    } = this.props;

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
                editProps={{
                  defaultValue: board || '',
                }}
                value={(
                  <Text>
                    {board}
                    <Edit color="brand" />
                  </Text>
)}
                change={newName => changeBoardName(board, newName.board)}
              />
            ) : (
              board
            )}
            <Button onClick={() => changeActiveBoard(board)}>
              <Projects color="brand" />
            </Button>
            {board !== 'INBOX' && (
              <Button onClick={() => deleteBoard(board)}>
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
  boards: PropTypes.array,
  toggleBoardsDialog: PropTypes.func,
  createBoard: PropTypes.func.isRequired,
  changeBoardName: PropTypes.func.isRequired,
};

BoardsDialog.defaultProps = {
  toggleBoardsDialog: null,
  boards: ['INBOX'],
};

export default BoardsDialog;
