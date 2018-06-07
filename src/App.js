import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as config from './config';
import * as actionCreators from './store/actions';
import { setColor } from './shared/helpers';

import Aux from './hoc/Aux';
import AsyncComponent from './hoc/AsyncComponent';
import Auth from './containers/Auth/Auth';

const asyncCalendars = AsyncComponent( () => import('./containers/Calendars/Calendars'));
const asyncCalendarDetails = AsyncComponent( () => import('./containers/CalendarDetails/CalendarDetails'));
const asyncAbout = AsyncComponent( () => import('./components/About/About'));
class App extends Component {

  componentDidMount = () => {
    setColor();
    this.handleClientLoad();
  }

  handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    window.gapi.load('client', this.initClient);
  }

  initClient = () => {
      // Initialize the client with API key and People API, and initialize OAuth with an
      // OAuth 2.0 client ID and scopes (space delimited string) to request access.
      window.gapi.client.init({
          apiKey: config.API_KEY,
          clientId: config.CLIENT_ID,
          discoveryDocs: config.DISCOVERY_DOCS,
          scope: config.SCOPE
      }).then( () => {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  }

  updateSigninStatus = (isSignedIn) => {
      if(isSignedIn) {
          this.props.userLogIn();
          localStorage.setItem('signinStatus', true);
      } else {
          this.props.userLogOut();
          localStorage.setItem('signinStatus', false);
      }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/about" component={asyncAbout} />
        <Route path="/login" component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/calendar/:id" component={asyncCalendarDetails}/>
          <Route path="/about" component={asyncAbout} />
          <Route path="/" exact component={asyncCalendars} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Aux>
        {routes}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.signedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogIn: () => dispatch(actionCreators.logIn()),
    userLogOut: () => dispatch(actionCreators.logOut())
  };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
