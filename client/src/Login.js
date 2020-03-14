import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
      <div>
        Login
        <br />
        Email:
        <input value={this.state.email} onChange={this.emailInputChange} />
        <br />
        Password:
        <input
          value={this.state.password}
          onChange={this.passwordInputChange}
        />
        <br/>
        <button onClick={this.login}>click to log in</button>
      </div>
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
