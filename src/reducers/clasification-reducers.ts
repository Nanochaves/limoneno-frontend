import { GET_WORKOUT, NO_HAVE_WORKOUTS } from '../actions/doclasifications';
/* Set the initial state of reducer.
    This reducer controlle:
    - The user authenticated in platform
*/
const initialState = {
    workout: null,
    noWorkouts: false
};

// Generate the reducer with the actions
export default function(state: any = initialState, action: any) {
  switch (action.type) {
    case GET_WORKOUT:
      return Object.assign({}, state, { workout: action.payload });
    case NO_HAVE_WORKOUTS:
      return Object.assign({}, state, { noWorkouts: true });
    default:
      return state;
  }
}
