import { actionTypes } from "../Actions/ActionTypes";
import { updateObject, isEmpty, setAuthToken } from "../../Util/Util";
const initialState = {
  authLoading: false,
  authSignUpErrors: {},
  authLogInErrors: {},
  authLogOutErrors: {},
  somethingWentWrong: null,
  user: {},
  isAuthenticated: false
};
const clearAuthSignUpErrors = state => {
  return updateObject(state, {
    authSignUpErrors: {},
    authLoading: false
  });
};
const clearAuthLogInErrors = state => {
  return updateObject(state, {
    authLogInErrors: {},
    authLoading: false
  });
};

const authSomethingWentWrong = (state, action) => {
  return updateObject(state, {
    authLoading: false,
    somethingWentWrong: action.somethingWentWrong
  });
};
const authSomethingWentWrongCloseHandler = state => {
  return updateObject(state, {
    somethingWentWrong: null
  });
};
const authSignUpStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    authLoading: true,
    authSignUpErrors: {}
  });
};
const authSignUpSuccess = state => {
  return updateObject(state, {
    authLoading: false,
    somethingWentWrong: null,
    authSignUpErrors: {}
  });
};

const authSignUpFail = (state, action) => {
  return updateObject(state, {
    authLoading: false,
    authSignUpErrors: action.errors
  });
};

const authLogInStart = state => {
  return updateObject(state, {
    authLoading: true,
    authLogInErrors: {},
    somethingWentWrong: null
  });
};

const authLogInSuccess = (state, action) => {
  return updateObject(state, {
    somethingWentWrong: null,
    authLoading: false,
    authLogInErrors: {},
    user: action.user,
    isAuthenticated: !isEmpty(action.user)
  });
};
const authLogInFail = (state, action) => {
  return updateObject(state, {
    authLoading: false,
    authLogInErrors: action.errors
  });
};

const authLogOutStart = state => {
  return updateObject(state, {
    authLoading: true
  });
};
const authLogOutSuccess = state => {
  setAuthToken(false);
  localStorage.removeItem("jwtToken");
  return updateObject(state, {
    user: {},
    isAuthenticated: false,
    authLoading: false
  });
};
const authLogOutFail = (state, action) => {
  return updateObject(state, {
    authErrors: action.errors,
    authLoading: false
  });
};

// PASSWORD RESET REDUCER ...

const authResetPasswordStart = state => {
  return updateObject(state, {
    authLoading: true
  });
};
const authResetPasswordSuccess = state => {
  return updateObject(state, {
    authLoading: false
  });
};
const authResetPasswordFail = (state, action) => {
  return updateObject(state, {
    authErrors: action.errors,
    authLoading: false
  });
};
// NEW PASSWORD  REDUCER ...

const authNewPasswordStart = state => {
  return updateObject(state, {
    authLoading: true
  });
};
const authNewPasswordSuccess = state => {
  return updateObject(state, {
    authLoading: false
  });
};
const authNewPasswordFail = (state, action) => {
  return updateObject(state, {
    authErrors: action.errors,
    authLoading: false
  });
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SOMETHING_WENT_WRONG:
      return authSomethingWentWrong(state, action);
    case actionTypes.AUTH_SOMETHING_WENT_WRONG_CLOSE:
      return authSomethingWentWrongCloseHandler(state);

    case actionTypes.AUTH_LOGIN_START:
      return authLogInStart(state);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return authLogInSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return authLogInFail(state, action);

    case actionTypes.AUTH_SIGNUP_START:
      return authSignUpStart(state);
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return authSignUpSuccess(state);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return authSignUpFail(state, action);

    case actionTypes.AUTH_RESET_PASSWORD_START:
      return authResetPasswordStart(state);
    case actionTypes.AUTH_RESET_PASSWORD_SUCCESS:
      return authResetPasswordSuccess(state);
    case actionTypes.AUTH_RESET_PASSWORD_FAIL:
      return authResetPasswordFail(state, action);

    case actionTypes.AUTH_NEW_PASSWORD_START:
      return authNewPasswordStart(state);
    case actionTypes.AUTH_NEW_PASSWORD_SUCCESS:
      return authNewPasswordSuccess(state);
    case actionTypes.AUTH_NEW_PASSWORD_FAIL:
      return authNewPasswordFail(state, action);

    case actionTypes.CLEAR_AUTH_SIGNUP_ERRORS:
      return clearAuthSignUpErrors(state);
    case actionTypes.CLEAR_AUTH_LOGIN_ERRORS:
      return clearAuthLogInErrors(state);

    case actionTypes.AUTH_LOGOUT_START:
      return authLogOutStart(state);
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return authLogOutSuccess(state);
    case actionTypes.AUTH_LOGOUT_FAIL:
      return authLogOutFail(state);

    default:
      return state;
  }
};

export default AuthReducer;
