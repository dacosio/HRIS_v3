import axios from "axios";
import { LOGIN, LOGOUT } from "../actions/authActionTypes";

export function loginSuccessAction(obj) {
  return {
    type: LOGIN,
    token: obj.token,
    userData: obj.userData
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
  localStorage.clear("token");
  localStorage.clear("userData");

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
          //dispatch(loginSuccessAction(response.data.token));
          return  axios
            .get(`${process.env.REACT_APP_API_SERVER}/api/secret`, {
              headers: { Authorization: `Bearer ${response.data.token}` }
            });
        }
        throw new Error("Invalid login");
      })
      .then(response => {
        if (response.data !== null) {
          localStorage.setItem("userData", JSON.stringify(response.data));

          const obj = {
            token: localStorage.getItem("token"),
            userData: localStorage.getItem("userData")
          };
          dispatch(loginSuccessAction(obj));
        }
      })
      .catch(err => console.log("Error: ", err));
  };
}
