import { VALIDATE_USER, LOGGING_REQUIRED, AUTHENTICATION_FAIL, UPDATE_USERS, 
        SET_USER, SET_TMP_USER } from '../actions/dousers';
/* Set the initial state of reducer.
    This reducer controlle:
    - The user authenticated in platform
*/
const initialState = {
    data: null,
    logging: false,
    auth_error: false,
    users: []
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case VALIDATE_USER:
      return Object.assign({}, state, { data: action.payload });
    case LOGGING_REQUIRED:
      return Object.assign({}, state, {});
    case AUTHENTICATION_FAIL:
      return Object.assign({}, state, { auth_error: true });
    case UPDATE_USERS:
      return Object.assign({}, state, { list: action.payload });
    case SET_USER:
      return Object.assign({}, state, { tmpUser: action.payload });
    case SET_TMP_USER:
      return Object.assign({}, state, { tmpUser: action.payload });
    default:
      return state;
  }
}
