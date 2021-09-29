import { combineReducers } from 'redux';
import usersComparationReducer from './users-reducers';
import datasetReducers from './dataset-reducers';
import projectReducers from './project-reducers';
import clasificationReducers from './clasification-reducers';

// Const used to integrate all reducers in the store.
const allReducers = combineReducers({
    user: usersComparationReducer,
    dataset: datasetReducers,
    project: projectReducers,
    clasification: clasificationReducers
    
});

export default allReducers;
