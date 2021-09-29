
import { createBrowserHistory } from 'history';
import { SET_TMP_DATATSET, UPDATE_DATASETS, 
  UPDATE_DATASET_ITEMS, 
  UPDATE_ACTIVE_DATASETS} from '../actions/dodatasets';
export const browserHistory = createBrowserHistory();
/* Set the initial state of reducer.
    This reducer controlle:
*/
const initialState = {
  list: [],
  tmpDataset: null,
  dataset: null,
  activeList: null
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case SET_TMP_DATATSET:
      return Object.assign({}, state, { tmpDataset: action.payload });
    case UPDATE_DATASETS:
      return Object.assign({}, state, { list: action.payload });
    case UPDATE_ACTIVE_DATASETS:
      return Object.assign({}, state, { activeList: action.payload });
    case UPDATE_DATASET_ITEMS:
        return Object.assign({}, state, { dataset: action.payload });
    default:
      return state;
  }
}
