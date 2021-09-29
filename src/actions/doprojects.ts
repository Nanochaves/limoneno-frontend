import { Project } from '../models/project';
import ProjectService from '../services/projects/projects.service';

// Declare the type actions constants
export const SET_TMP_PROJECT = "SET_TMP_PROJECT";
export const UPDATE_PROJECTS = "UPDATE_PROJECTS";
export const UPDATE_PROJECT_ITEMS = "UPDATE_PROJECT_ITEMS";
export const UPDATE_USER_PROJECTS = "UPDATE_USER_PROJECTS";

export const setProject = (project: Project) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      payload: project,
      type: SET_TMP_PROJECT
    });
  }
};

export const getProjects = (project: Project) => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().getProjects().subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECTS
      });
    });
  }
};

export const getProject = (id: number) => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().getProject(id).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECT_ITEMS
      });
    });
  }
};

export const editProject = (project: Project) => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().update(project).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECT_ITEMS
      });
    });
  }
};

export const destroyProject = (project: Project) => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().destroy(project).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECTS
      });
      dispatch({
        payload: null,
        type: SET_TMP_PROJECT
      });
    });
  }
};

export const getUserProjects = () => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().getUserProjects().subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_USER_PROJECTS
      });
    });
  }
};

export const assignPool = (id: number, usersPool: {}) => {
  return (dispatch: any, getState: any) => {
    ProjectService.getInstance().assignPool(id, usersPool).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_PROJECTS
      });
    });
  }
};
