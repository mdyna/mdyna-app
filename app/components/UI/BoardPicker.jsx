import React, { Component } from 'react';
import { Text, Menu } from 'grommet';
import { RIEInput } from 'riek';
import { Projects, Add } from 'grommet-icons';
import PropTypes from 'prop-types';
import { validateBoards } from '../BoardsDialog';

import './BoardPicker.scss';

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
      value,
    } = this.props;
    return (
      <Menu
        icon={(
          <Projects
            color="brand"
            style={{
              verticalAlign: 'bottom',
              margin: '0 5px',
            }}
          />
)}
        justifyContent="center"
        className="boards-menu"
        dropBackground="dark-2"
        label={value || 'Boards'}
        dropAlign={{ top: 'bottom' }}
        items={[
          {
            label: (
              <Text>
                Manage Boards
                {' '}
                <Projects
                  color="brand"
                  style={{
                    verticalAlign: 'bottom',
                    margin: '0 5px',
                  }}
                />
              </Text>
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
  value: PropTypes.string,
  createBoard: PropTypes.func,
  boardNames: PropTypes.array,
  boards: PropTypes.array,
  toggleBoardsDialog: PropTypes.func.isRequired,
};

BoardPicker.defaultProps = {
  value: '',
  boardNames: [],
  addButton: false,
  boards: {},
  createBoard: null,
};
