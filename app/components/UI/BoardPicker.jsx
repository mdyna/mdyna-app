import React, { Component } from 'react';
import { Text, Menu } from 'grommet';
import { RIEInput } from 'riek';
import { Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import Button from 'UI/Button';
import BoardsIcon from 'UI/BoardsIcon';
import styled from 'styled-components';
import { validateBoards } from '../BoardsDialog';

import './BoardPicker.scss';

const ManageBoardsLabel = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export default class BoardPicker extends Component {
  getBoardId(boardName) {
    const { boards } = this.props;
    if (boardName === 'INBOX') {
      return 'INBOX';
    }
    for (let i = 0; i < boards.length; i += 1) {
      const board = boards[i];
      if (boardName === board.name) {
        return board.id;
      }
    }
    return 'INBOX';
  }

  render() {
    const {
      onClick,
      toggleBoardsDialog,
      boardNames,
      addButton,
      createBoard,
    } = this.props;
    return (
      <Menu
        icon={(
          <Button>
            <BoardsIcon />
          </Button>
)}
        justifyContent="center"
        className="boards-menu"
        dropBackground="dark-2"
        label="Boards"
        dropAlign={{ top: 'bottom' }}
        items={[
          {
            label: (
              <ManageBoardsLabel>
                Manage Boards
                {' '}
                <BoardsIcon />
              </ManageBoardsLabel>
            ),
            onClick: () => toggleBoardsDialog(),
          },
          addButton && {
            label: (
              <RIEInput
                className="board-input add-board"
                classEditing="editing-board"
                change={(v) => {
                  if (v.name) {
                    if (createBoard && validateBoards(v.name, boardNames)) {
                      createBoard(v.name);
                    }
                    onClick(this.getBoardId(v.name));
                  }
                }}
                editProps={{
                  defaultValue: '',
                }}
                value={(
                  <Text>
                    Add board
                    <Add color="brand" />
                  </Text>
)}
                propName="name"
              />
            ),
          },
          ...boardNames.map(board => ({
            label: board,
            onClick: () => onClick(this.getBoardId(board)),
          })),
        ]}
      />
    );
  }
}

BoardPicker.propTypes = {
  onClick: PropTypes.func.isRequired,
  addButton: PropTypes.bool,
  createBoard: PropTypes.func,
  boardNames: PropTypes.array,
  boards: PropTypes.array,
  toggleBoardsDialog: PropTypes.func.isRequired,
};

BoardPicker.defaultProps = {
  boardNames: [],
  addButton: false,
  boards: {},
  createBoard: null,
};
