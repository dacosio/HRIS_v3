import axios from "axios";
import { LOGIN, LOGOUT } from "../actions/authActionTypes";

export function loginSuccessAction(token) {
  return {
    type: LOGIN,
    token: token
  };
}

export function logoutAction() {
  localStorage.clear("token");
  localStorage.clear("userData");
  return {
    type: LOGOUT
  };
}

export function loginThunk(email, password) {
  return dispatch => {
    console.log(email, password);
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        email: email,
        password: password
      })
      .then(response => {
        if (response.data !== null) {
          // thunk can conditionally dispatch actions
          localStorage.setItem("token", response.data.token);
          dispatch(loginSuccessAction(response.data.token));
        } else {
          // you can dispatch other actions here if needed
          // for example, to show a error message in a modal
        }
      })
      .catch(err => console.log("Error: ", err));
  };
}
