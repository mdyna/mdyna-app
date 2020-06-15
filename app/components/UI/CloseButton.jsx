import './Button.scss'; // eslint-disable-line

import React, { Component as PureComponent } from 'react';

import { Close } from 'grommet-icons';
import PropTypes from 'prop-types';
import Button from 'UI/Button';
import styled from 'styled-components';


const StyledDiscardBtn = styled(Button)`
    border: 1px solid ${props => !console.log(props.theme) && props.theme.global.colors['accent-2']}; !important;
    min-height: 38px;
    align-self: flex-end;
    &:hover {
      svg {
        fill: ${props => props.theme.global.colors['dark-1']};
        stroke: ${props => props.theme.global.colors['dark-1']};
      }
    }
    svg {
      margin: 0 auto !important;
    }
  `;


class CloseButton extends PureComponent {
  render() {
    const {
      action, color,
    } = this.props;
    return (
      <StyledDiscardBtn
        color={color}
        onClick={action}
        hoverIndicator={color}
      >
        <Close color={color} hoverIndicator="dark-1" />
      </StyledDiscardBtn>
    );
  }
}

CloseButton.propTypes = {
  action: PropTypes.func.isRequired,
  color: PropTypes.string,
};

CloseButton.defaultProps = {
  color: 'accent-2',
};

export default CloseButton;
