import React from 'react';
import Focus from 'Assets/icons/focus.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const BoardsIcon = ({ className }) => <SVG className={className} src={Focus} />;

const StyledBoardsIcon = styled(BoardsIcon)`
  width: 32px;
  vertical-align: bottom;
  margin: 5px;
  path {
    stroke-width: 12px;
    fill: ${props => props.color || props.theme.global.colors.brand};
    stroke: ${props => props.color || props.theme.global.colors.brand};
  }
  rect {
    stroke-width: 40px;
    stroke: ${props => props.color || props.theme.global.colors.brand};
  }
`;

export default StyledBoardsIcon;
