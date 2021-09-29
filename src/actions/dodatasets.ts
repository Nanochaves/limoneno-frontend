import { Dataset } from '../models/dataset';
import DatasetService from '../services/datasets/datasets.service';

// Declare the type actions constants
export const SET_TMP_DATATSET = "SET_TMP_DATATSET";
export const UPDATE_DATASETS = "UPDATE_DATASETS";
export const UPDATE_ACTIVE_DATASETS = "UPDATE_ACTIVE_DATASETS";
export const UPDATE_DATASET_ITEMS = "UPDATE_DATASET_ITEMS";

export const setDataset = (dataset: Dataset) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      payload: dataset,
      type: SET_TMP_DATATSET
    });
  }
};

export const getDatasets = (dataset: Dataset) => {
  return (dispatch: any, getState: any) => {
    DatasetService.getInstance().getDatasets().subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_DATASETS
      });
    });
  }
};

export const getActiveDatasets = (dataset: Dataset) => {
  return (dispatch: any, getState: any) => {
    DatasetService.getInstance().getActiveDatasets().subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_ACTIVE_DATASETS
      });
    });
  }
};

export const getDataset = (id: number) => {
  return (dispatch: any, getState: any) => {
    DatasetService.getInstance().getDataset(id).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_DATASET_ITEMS
      });
    });
  }
};

export const publishDataset = (dataset: Dataset) => {
  return (dispatch: any, getState: any) => {
    if (dataset && dataset.id) {
      DatasetService.getInstance().update(dataset).subscribe(data => {
        dispatch({
          payload: data,
          type: UPDATE_DATASETS
        });
        dispatch({
          payload: null,
          type: SET_TMP_DATATSET
        });
      });
    } else {
      if (dataset) {
        DatasetService.getInstance().create(dataset).subscribe(data => {
          dispatch({
            payload: data,
            type: UPDATE_DATASETS
          });
          dispatch({
            payload: null,
            type: SET_TMP_DATATSET
          });
        });
      }
    }
  }
};

export const destroyDataset = (dataset: Dataset) => {
  return (dispatch: any, getState: any) => {
    DatasetService.getInstance().destroy(dataset).subscribe(data => {
      dispatch({
        payload: data,
        type: UPDATE_DATASETS
      });
      dispatch({
        payload: null,
        type: SET_TMP_DATATSET
      });
    });
  }
};