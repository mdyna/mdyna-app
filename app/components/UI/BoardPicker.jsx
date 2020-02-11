import React, { PureComponent } from 'react';
import { Text, Menu } from 'grommet';
import { RIEInput } from 'riek';
import { Add, Down } from 'grommet-icons';
import PropTypes from 'prop-types';
import BoardsIcon from 'UI/BoardsIcon';
import styled from 'styled-components';
import { validateBoards } from '../BoardsDialog';

import './BoardPicker.scss';

const BoardMenuHeader = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;
  font-weight: 700;
  svg {
    margin: 0 !important;
  }
`;

export default class BoardPicker extends PureComponent {
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

  static getBoardName(boardId, boards) {
    if (boardId === 'INBOX') {
      return 'INBOX';
    }
    for (let i = 0; i < boards.length; i += 1) {
      const board = boards[i];
      if (boardId === board.id) {
        return board.name;
      }
    }
    return 'INBOX';
  }

  render() {
    const {
      onClick,
      toggleBoardsDialog,
      boardNames,
      boards,
      addButton,
      createBoard,
      value,
    } = this.props;
    const currentBoardName = BoardPicker.getBoardName(value, boards);
    return (
      <Menu
        justifyContent="center"
        className="boards-menu"
        dropBackground="dark-2"
        icon={<Down color="brand" />}
        label={(
          <Text color="brand">
            {(currentBoardName !== 'INBOX' && currentBoardName) || ''}
          </Text>
)}
        dropAlign={{ top: 'bottom' }}
        items={[
          {
            label: (
              <BoardMenuHeader>
                <span>Manage</span>
                {' '}
                <BoardsIcon />
              </BoardMenuHeader>
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
                  <BoardMenuHeader>
                    <span>Add</span>
                    <Add color="brand" />
                  </BoardMenuHeader>
)}
                propName="name"
              />
            ),
          },
          ...boardNames.map(
            board => board && {
              label: board,
              onClick: () => onClick(this.getBoardId(board)),
            },
          ),
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
  value: PropTypes.string,
  boards: PropTypes.array,
  toggleBoardsDialog: PropTypes.func.isRequired,
};

BoardPicker.defaultProps = {
  boardNames: [],
  addButton: false,
  value: null,
  boards: {},
  createBoard: null,
};
