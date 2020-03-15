import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './Login';
import Auth from './Auth';

class App extends Component {
  render() {
    return (
      <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Auth} />
      </Switch>
      </>
    );
  }
}

export default App;
