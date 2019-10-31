import { actionTypes } from "./ActionTypes";
import axios from "../../api/Shopping-Card";
import jwtDecode from "jwt-decode";
import { setAuthToken } from "../../Util/Util";
import GraphQLQueries from "../../GraphQL/AuthQueries";

const authSomethingWentWrong = somethingWentWrong => {
  return {
    type: actionTypes.AUTH_SOMETHING_WENT_WRONG,
    somethingWentWrong: somethingWentWrong
  };
};
export const authSomethingWentWrongCloseHandler = () => {
  return {
    type: actionTypes.AUTH_SOMETHING_WENT_WRONG_CLOSE
  };
};

export const clearAuthSignUpErrors = () => {
  return {
    type: actionTypes.CLEAR_AUTH_SIGNUP_ERRORS
  };
};
export const clearAuthLogInErrors = () => {
  return {
    type: actionTypes.CLEAR_AUTH_LOGIN_ERRORS
  };
};

const authSignUpStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START
  };
};
const authSignUpSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS
  };
};
const authSignUpFail = errors => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    errors: errors
  };
};
export const authSignUp = (userData, history) => {
  return async dispatch => {
    dispatch(authSignUpStart());
    try {
      const graphqlQuery = `
        mutation {
          createUser(data:{
            userName:"${userData.userName}"
            mobileNumber:"${userData.mobileNumber}"
            email:"${userData.email}"
            password:"${userData.password}"
            confirmPassword:"${userData.confirmPassword}"
          }) {
            success
            message
          }
        }
      `;
      const response = await axios.post("/graphql", { query: graphqlQuery });

      if (response.data.data.createUser.success) {
        dispatch(authSignUpSuccess());
      }
      history.push("/login");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(authSignUpFail(error.response.data.errors[0].errors));
      } else {
        dispatch(authSomethingWentWrong(error.message));
      }
    }
  };
};

const authLogInStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START
  };
};
const authLogInSuccess = user => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    user
  };
};

const authLogInFail = errors => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    errors
  };
};

export const authLogIn = (userData, history) => {
  return async dispatch => {
    dispatch(authLogInStart());
    try {
      const graphqlQuery = `
        query {
          logIn(data:{
            email:"${userData.email}"
            password:"${userData.password}"
          }) {
            token
          }
        }
      `;
      const response = await axios.post("/graphql", { query: graphqlQuery });
      const { token } = response.data.data.logIn;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const user = jwtDecode(token);
      dispatch(authLogInSuccess(user));
      history.push("/");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(authLogInFail(error.response.data.errors[0].errors));
      } else {
        dispatch(authSomethingWentWrong(error.message));
      }
    }
  };
};

// LOGOUT ACTIONS ...
export const authLogOutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_START
  };
};
export const authLogOutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS
  };
};
export const authLogOutFail = errors => {
  return {
    type: actionTypes.AUTH_LOGOUT_FAIL,
    errors
  };
};
export const authLogOut = history => {
  return async dispatch => {
    try {
      dispatch(authLogOutStart());
      const response = await axios.post("/graphql", {
        query: GraphQLQueries.logOutQuery
      });
      if (response.data.data.logOut.success) {
        dispatch(authLogOutSuccess());
        history.push("/");
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data.errors[0].errors) {
          dispatch(authLogOutFail(error.response.data.errors[0].errors));
        } else {
          dispatch(authSomethingWentWrong(error.message));
        }
      }
      dispatch(authSomethingWentWrong(error.message));
    }
  };
};

export const checkExpiredTime = (expiredTime, history) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogOut(history));
    }, expiredTime * 1000);
  };
};

export const authCheckLogInState = history => {
  return async dispatch => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const user = jwtDecode(localStorage.jwtToken);
      const currenTime = Date.now() / 1000;
      if (user.exp < currenTime) {
        dispatch(authLogOut(history));
        return;
      }
      const totalExpTimeLeft = user.exp - currenTime;
      dispatch(authLogInSuccess(user));
      dispatch(checkExpiredTime(totalExpTimeLeft, history));
    }
  };
};

// RESET PASSWORD ACTIONS ...
export const authResetPasswordStart = () => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD_START
  };
};
export const authResetPasswordSuccess = () => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD_SUCCESS
  };
};
export const authResetPasswordFail = errors => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD_FAIL,
    errors
  };
};

export const authResetPassword = (userData, history) => {
  return async dispatch => {
    dispatch(authResetPasswordStart());
    try {
      const graphqlQuery = `
        mutation {
          postResetPassword(data: {
            email:"${userData.email}"
          }) {
            success
            message
          }
        }
      `;
      const response = await axios.post("/graphql", { query: graphqlQuery });
      if (response.data.data.postResetPassword.success) {
        dispatch(authResetPasswordSuccess());
        alert(response.data.data.postResetPassword.message);
        history.push("/login");
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data.errors[0].errors) {
          dispatch(authResetPasswordFail(error.response.data.errors[0].errors));
        } else {
          dispatch(authSomethingWentWrong(error.message));
        }
      }
      dispatch(authSomethingWentWrong(error.message));
    }
  };
};

// NEW PASSWORD ACTIONS ...
export const authNewPasswordStart = () => {
  return {
    type: actionTypes.AUTH_NEW_PASSWORD_START
  };
};
export const authNewPasswordSuccess = () => {
  return {
    type: actionTypes.AUTH_NEW_PASSWORD_SUCCESS
  };
};
export const authNewPasswordFail = errors => {
  return {
    type: actionTypes.AUTH_NEW_PASSWORD_FAIL,
    errors
  };
};

export const authNewPassword = (userData, token, history) => {
  return async dispatch => {
    dispatch(authNewPasswordStart());
    try {
      const graphqlQuery = `
        mutation {
          postNewPassword(data: {
            password:"${userData.password}",
            confirmPassword :"${userData.confirmPassword}",
            token:"${token}"
          }) {
            success
            message
          }
        }
      `;
      const response = await axios.post("/graphql", { query: graphqlQuery });
      if (response.data.data.postNewPassword.success) {
        dispatch(authNewPasswordSuccess());
        alert(response.data.data.postNewPassword.message);
        history.push("/login");
      }
    } catch (error) {
      if (error.response !== undefined) {
        if (error.response.data.errors[0].errors) {
          dispatch(authNewPasswordFail(error.response.data.errors[0].errors));
        } else {
          dispatch(authSomethingWentWrong(error.message));
        }
      }
      dispatch(authSomethingWentWrong(error.message));
    }
  };
};
