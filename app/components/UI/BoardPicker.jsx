import React, { Component } from 'react';
import { Text, Menu } from 'grommet';
import { Projects, Add } from 'grommet-icons';
import PropTypes from 'prop-types';

import './BoardPicker.scss';

export default class BoardPicker extends Component {
  render() {
    const { onClick, toggleBoardsDialog, boardNames } = this.props;
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
        label="Boards"
        dropAlign={{ top: 'bottom' }}
        items={
          [
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
            ...boardNames.map(board => ({
              label: board,
              onClick: () => onClick(board),
            })),
          ] || [
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
            { label: 'INBOX', onClick: () => onClick('INBOX') },
          ]
        }
      />
    );
  }
}

BoardPicker.propTypes = {
  onClick: PropTypes.func.isRequired,
  boards: PropTypes.object,
  boardNames: PropTypes.array,
  toggleBoardsDialog: PropTypes.func.isRequired,
};

BoardPicker.defaultProps = {
  boards: {},
  boardNames: [],
};
