import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import './Login.css';

import * as authActions from "./store/actions/authActions";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  emailInputChange = event => {
    const val = event.currentTarget.value;
    this.setState({ email: val });
  };

  passwordInputChange = event => {
    const val = event.currentTarget.value;
    this.setState({ password: val });
  };

  login = event => {
    event.preventDefault();
    this.props.loginDispatch(this.state.email, this.state.password);
  };


  
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect exact to="/attendance" />;
    }
    return (
      <section className="entry-page">
        <form>
          <h2>Welcome!</h2>
            <fieldset>
              <legend className="text-center">Human Resource Info System</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username</label>
                  <input value={this.state.email} onChange={this.emailInputChange} />
                </li>
                <li>
                  <label htmlFor="password">Password</label>
                  <input type="password" value={this.state.password} onChange={this.passwordInputChange}/>
                </li>
              </ul>
            </fieldset>
            <button onClick={this.login}>Log in</button>
          </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => {
    dispatch(authActions.loginThunk(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);


/******************** */

