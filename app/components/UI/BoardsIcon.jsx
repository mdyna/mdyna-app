import React from 'react';
import Boards from 'Assets/icons/boards.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const BoardsIcon = ({ className }) => (
  <SVG className={className} src={Boards} />
);

const StyledBoardsIcon = styled(BoardsIcon)`
  vertical-align: bottom;
  min-width: 24px;
  max-width: 24px;
  path {
    stroke-width: 24px;
    stroke: ${props => props.theme.global.colors.brand};
  }
`;

export default StyledBoardsIcon;
