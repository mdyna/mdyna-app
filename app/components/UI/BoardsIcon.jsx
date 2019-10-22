import React from 'react';
import Boards from 'Assets/icons/boards.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

import './BoardPicker.scss';

// eslint-disable-next-line react/prop-types
const BoardsIcon = ({ className }) => (
  <SVG className={className} src={Boards} />
);

const StyledBoardsIcon = styled(BoardsIcon)`
  width: 24px;
  vertical-align: bottom;
  margin: 5px;
  path {
    fill: ${props => props.theme.global.colors.brand};
    stroke: ${props => props.theme.global.colors.brand};
  }
  rect {
    stroke-width: 12px;
    stroke: ${props => props.theme.global.colors.brand};
  }
`;

export default StyledBoardsIcon;
