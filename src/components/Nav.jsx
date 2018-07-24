import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Brush from 'grommet/components/icons/base/Brush';
import Button from 'grommet/components/Button';
import classnames from 'classnames';
import Image from 'grommet/components/Image';
import logo from '../../assets/dynaLogo.png';

import '!style-loader!css-loader!sass-loader!./Nav.scss'; // eslint-disable-line
class NavBar extends Component {
  render() {
    return (
      <Box
        full="horizontal"
        justify="start"
        className={classnames('navbar', { 'white-mode': this.props.whiteMode })}
        pad="small"
        direction="row"
      >
        <Image src={logo} className="navbar-app-logo" alt="dyna" size="small" />
        <Button
          onClick={() => {
            this.props.toggleWhiteMode(!this.props.whiteMode);
          }}
          className="white-mode-button"
        >
          <Brush />
        </Button>
      </Box>
    );
  }
}

NavBar.propTypes = {
  toggleWhiteMode: PropTypes.func.isRequired,
  whiteMode: PropTypes.bool,
};

NavBar.defaultProps = {
  whiteMode: false,
};

export default NavBar;
