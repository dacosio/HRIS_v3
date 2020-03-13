import { loginReducer } from "./authReducer";
import { loginSuccessAction } from "../actions/authActions";

describe("auth reducer", () => {
  test("loginReducer", () => {
    const currentState = {
      isLoggedIn: false,
      token: null
    };

    const newState = loginReducer(currentState, loginSuccessAction());

    expect(newState.isLoggedIn).toBe(true);
  });
});
