import React, { Component }  from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './Auth.css';
import { User } from './../../components/UI/Icons/Icons';

class Auth extends Component {

    handleSignInClick = () => {
        // Ideally the button should only show up after gapi.client.init finishes, so that this
        // handler won't be called before OAuth is initialized.
        window.gapi.auth2.getAuthInstance().signIn();
    }

    render () {
        let view = (
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
        if(this.props.isAuth) {
            view = (<Redirect to='/'/>);
        }
        return (
            view
        );
    }
} 

const mapStateToProps = state => {
  return {
    isAuth: state.signedIn
  };
};

export default connect(mapStateToProps)(Auth);