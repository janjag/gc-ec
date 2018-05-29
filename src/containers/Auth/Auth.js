import React, { Component }  from 'react';
import './Auth.css';
import { User } from './../../components/UI/Icons/Icons';
import * as config from './../../config';

class Auth extends Component {
    state = {
        isSignup: false,
        calendars: []
    };
  
    componentDidMount = () => {
        this.handleClientLoad();
        console.log(window.gapi);
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
            discoveryDocs: config.DISCOVERY_DOCS,
            clientId: config.CLIENT_ID,
            scope: config.SCOPES
        }).then( () => {
            // Listen for sign-in state changes.
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.setState( {
                isSignup: true
            });
            console.log(this.state.isSignup);
        } else {
            this.setState( {
                isSignup: false
            });
            console.log(this.state.isSignup);
        }
    }

    handleSignInClick = () => {
        // Ideally the button should only show up after gapi.client.init finishes, so that this
        // handler won't be called before OAuth is initialized.
        window.gapi.auth2.getAuthInstance().signIn();
    }
    
    render () {
        return (
            <div className="Auth_wrapper">
                <p className="Auth_info">Log in to your Google account to start using app.</p>
                <div className="Auth_button_wrapper">
                    <button 
                        className="Auth_button"
                        onClick={this.handleSignInClick}
                    >
                        <User name="Auth_icon" />
                        Log In
                    </button>
                </div>
            </div>
        );
    }
} 

export default Auth;