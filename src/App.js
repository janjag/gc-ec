import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Aux from './hoc/Aux';
import Auth from './containers/Auth/Auth';
import Calendars from './containers/Calendars/Calendars';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/calendars" component={Calendars} />
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Aux>
        {routes}
      </Aux>
    );
  }
}

export default App;
