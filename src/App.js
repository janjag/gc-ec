import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Aux from './hoc/Aux';
import Auth from './containers/Auth/Auth';
import Calendars from './containers/Calendars/Calendars';

class App extends Component {

  componentDidMount = () => this.handleClientLoad();

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
          apiKey: 'AIzaSyBT8d2rQ57RHWUMY2WWtiG2okgh_i7FyLM',
          clientId: '428792196990-oh8nmk8adiofg8nkefsbme8c23dr05dg.apps.googleusercontent.com',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: "https://www.googleapis.com/auth/calendar.readonly"
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
        <Route path="/login" component={Auth} />
        <Redirect to='/login' />
      </Switch>
    );
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={Calendars} />
          <Redirect to='/' />
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
    userLogIn: () => dispatch({type: "LOG_IN"}),
    userLogOut: () => dispatch({type: "LOG_OUT"})
  };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
