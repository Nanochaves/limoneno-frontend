import ClasificationService from '../services/clasification/clasification.service';
import { ProjectDatasetItem } from '../models/project-dataset-item';
import { UPDATE_PROJECT_ITEMS } from './doprojects';
import ProjectService from '../services/projects/projects.service';

// Declare the type actions constants
export const GET_WORKOUT = "GET_WORKOUT";
export const NO_HAVE_WORKOUTS = "NO_HAVE_WORKOUTS";

export const getWorkout = (project: number) => {
  return (dispatch: any, getState: any) => {
    // Make a REST call
    ProjectService.getInstance().getProject(project).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECT_ITEMS
      });
      ClasificationService.getInstance().getWorkout(data).subscribe((data: ProjectDatasetItem) => {
        dispatch({
          payload: data,
          type: GET_WORKOUT
        });
      }, error => {
        dispatch({
          type: NO_HAVE_WORKOUTS
        });
      });
    });
  }
};