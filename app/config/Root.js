import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mdyna from '../containers/App';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={() => <Mdyna />} />
      </Router>
    );
  }
}
