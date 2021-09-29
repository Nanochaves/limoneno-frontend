
import { createBrowserHistory } from 'history';
import { SET_TMP_PROJECT, UPDATE_PROJECTS,
  UPDATE_PROJECT_ITEMS,
  UPDATE_USER_PROJECTS} from '../actions/doprojects';
export const browserHistory = createBrowserHistory();
/* Set the initial state of reducer.
    This reducer controlle:
*/
const initialState = {
  list: [],
  tmpProject: null,
  project: null
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_TMP_PROJECT:
      return Object.assign({}, state, { tmpProject: action.payload });
    case UPDATE_PROJECTS:
      return Object.assign({}, state, { list: action.payload });
    case UPDATE_PROJECT_ITEMS:
      return Object.assign({}, state, { project: action.payload });
    case UPDATE_USER_PROJECTS:
      return Object.assign({}, state, { user_projects: action.payload });
    default:
      return state;
  }
}
