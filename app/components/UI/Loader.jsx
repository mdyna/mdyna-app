import React, { Component as PureComponent } from 'react';
import { Update } from 'grommet-icons';

import './Loader.scss';

class Loader extends PureComponent {
  render() {
    return (
      <div className="loader">
        <Update className="App-logo" alt="Mdyna-loader" color="brand" />
      </div>
    );
  }
}

export default Loader;
