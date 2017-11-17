import axios from 'axios';
import {
  FETCH_CURRENT_USER,
  FETCH_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  UPLOAD_FILES,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
  DONE
} from './types';

export const fetchTasks = () => async (dispatch, getState, api) => {
  const res = await api.get('/tasks');
  const tasksList = [];
  res.data.hits.map(task =>
    tasksList.push({
      name: task._source.name || '',
      description: task._source.description || '',
      priority: task._source.priority || 0,
      submittedByUser: task._source.submittedByUser || '',
      done: task._source.done || false,
      files: task._source.files || [],
      id: task._id
    })
  );
  console.log('====================================')
  console.log(tasksList)
  console.log('====================================')
  dispatch({
    type: FETCH_TASKS,
    payload: tasksList
  });
};

export const createTask = task => async (dispatch, getState, api) => {
  const res = await api.post('/new-task', {
    ...task,
    isTask: true,
    done: false
  });

  const addedTask = {
    name: task.taskName || '',
    description: task.description || '',
    priority: task.priority || 0,
    submittedByUser: task.submittedByUser || '',
    done: task.done || false,
    files: task.files || [],
    id: res.data._id
  };
  dispatch({
    type: CREATE_TASK,
    payload: addedTask
  });
};

export const deleteTask = index => async (dispatch, getState, api) => {
  console.log(index);
  const res = await api.delete('/delete', index);

  dispatch({
    type: DELETE_TASK,
    payload: index
  });
};

export const updateTask = task => async (dispatch, getState, api) => {
  console.log(task);
  const res = await api.delete('/update', id);

  // dispatch({
  //   type: UPDATE_TASK,
  //   payload: res
  // });
};

export const uploadFiles = file => async (dispatch, getState, api) => {
  console.log(file);
  const res = await api.post('/upload-files', file);

  // dispatch({
  //   type: UPLOAD_FILES,
  //   payload: res
  // });
};

export const isDone = (id, done) => async (dispatch, getState, api) => {
  console.log(id);
  const res = await api.post('/done', !done);

  // dispatch({
  //   type: DONE,
  //   payload: res
  // });
};

export const uploadDocumentRequest = ({ file, name }) => async (
  dispatch,
  getState,
  api
) => {
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);
  let res;

  try {
    res = await api.post('/upload', data);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    return {
      type: UPLOAD_DOCUMENT_SUCCESS,
      payload: true
    };
  } catch (error) {
    return {
      type: UPLOAD_DOCUMENT_FAIL,
      payload: false
    };
  }
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
