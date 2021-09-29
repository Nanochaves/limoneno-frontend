import UserService from '../services/users/users.service';
import { User } from '../models/user';

// Declare the type actions constants
export const VALIDATE_USER = "VALIDATE_USER";
export const LOGGING_REQUIRED = "LOGGING_REQUIRED";
export const AUTHENTICATION_FAIL = "AUTHENTICATION_FAIL";
export const UPDATE_USERS = "UPDATE_USERS";
export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR";
export const SET_USER = "SET_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_TMP_USER = "SET_TMP_USER";

export const getAuthentication = (history: any) => {
  return (dispatch: any, getState: any) => {
    // Make a REST call
    UserService.getInstance().me().subscribe((data: User) => {
      // Return the user
      dispatch({
        payload: data,
        type: VALIDATE_USER
      });
    }, error => {
      history.push('/login');
    });
  }
};

export const doLogin = (email: string, password: string, history: any) => {
  return (dispatch: any, getState: any) => {
    // Make a REST call
    UserService.getInstance().login(email, password).subscribe((data: User) => {
      // Return the user
      history.push('/');
    }, error => {
      dispatch({
        type: AUTHENTICATION_FAIL
      });
    });
  }
};

export const doLogout = (history: any) => {
  return (dispatch: any, getState: any) => {
    // Make a REST call
    UserService.getInstance().logout().subscribe((data: boolean) => {
      // Return the user
      history.push('/login');
    }, error => {
      history.push('/');
    });
  }
};

export const getUsers = () => {
  return (dispatch: any, getState: any) => {
    // Make a REST call
    UserService.getInstance().getUsers().subscribe((data: User[]) => {
      // Return the users
      let users = data.map(user => {
        return new User(user);
      });

      dispatch({
        payload: users,
        type: UPDATE_USERS
      });
    }, error => {
      dispatch({
        type: USERS_FETCH_ERROR
      });
    });
  }
};

export const setUser = (user: User) => {
  return (dispatch: any, getState: any) => {

    if (user && user.id) {
      UserService.getInstance().update(user).subscribe(data => {
        let users = data.map(user => {
          return new User(user);
        });
        dispatch({
          payload: users,
          type: UPDATE_USERS
        });
        dispatch({
          payload: null,
          type: SET_USER
        });
      });
    } else {
      if (user) {
        UserService.getInstance().create(user).subscribe(data => {
          let users = data.map(user => {
            return new User(user);
          });
          dispatch({
            payload: users,
            type: UPDATE_USERS
          });
          dispatch({
            payload: null,
            type: SET_USER
          });
        });
      }
    }
  }
};

export const doDeleteUser = (user: User) => {
  return (dispatch: any, getState: any) => {
    UserService.getInstance().destroy(user).subscribe(data => {
      let users = data.map(user => {
        return new User(user);
      });
      dispatch({
        payload: users,
        type: UPDATE_USERS
      });
      dispatch({
        payload: null,
        type: SET_USER
      });
    });
  }
};

export const setTmpUser = (user: User) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: SET_TMP_USER,
      payload: user
    });
  }
};