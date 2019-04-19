import React, { Component as PureComponent } from 'react';
import Image from 'grommet/components/Image';
import logo from '../../../resources/MdynaLogoCircle.png';

class Loader extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Image src={logo} className="loader" alt="Mdyna" size="small" />
      </React.Fragment>
    );
  }
}

export default Loader;
