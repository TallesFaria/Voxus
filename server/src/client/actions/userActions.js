import axios from "axios";
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
} from "./types";

export const fetchTasks = () => async (dispatch, getState, api) => {
  const res = await api.get("/tasks");
  console.log("==============FETCH TASKS RES===================");
  console.log(res.data.hits);
  console.log("====================================");
  dispatch({
    type: FETCH_TASKS,
    payload: res.data.hits
  });
};

export const createTask = task => async (dispatch, getState, api) => {
  console.log(task);
  const res1 = await api.post("/new-task", {
    ...task,
    isTask: true,
    done: false
  });
  const res = await api.get("/tasks");
  dispatch({
    type: FETCH_TASKS,
    payload: res.data.hits
  });
};

export const deleteTask = id => async (dispatch, getState, api) => {
  console.log(id);
  const res = await api.delete("/delete", id);

  // dispatch({
  //   type: DELETE_TASK,
  //   payload: res
  // });
};

export const updateTask = task => async (dispatch, getState, api) => {
  console.log(task);
  const res = await api.delete("/update", id);

  // dispatch({
  //   type: UPDATE_TASK,
  //   payload: res
  // });
};

export const uploadFiles = file => async (dispatch, getState, api) => {
  console.log(file);
  const res = await api.post("/upload-files", file);

  // dispatch({
  //   type: UPLOAD_FILES,
  //   payload: res
  // });
};

export const done = (id, done) => async (dispatch, getState, api) => {
  console.log(id);
  const res = await api.post("/done", !done);

  // dispatch({
  //   type: DONE,
  //   payload: res
  // });
};

export const uploadSuccess = ({ data }) => {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    payload: data
  };
};

export const uploadFail = error => {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    payload: error
  };
};

export const uploadDocumentRequest = ({ file, name }) => async (dispatch, getState, api) => {
  let data = new FormData();
  data.append("file", document);
  data.append("name", name);
  let res;

  try{
    res =  await api.post("/upload", data)
  } catch(error) {
    dispatch(uploadFail(error))
  }

  console.log('====================================');
  console.log(res);
  console.log('====================================');

};

// export const uploadDocumentRequest = ({ file, name }) => async (dispatch, getState, api) => {
//   let data = new FormData();
//   data.append("file", document);
//   data.append("name", name);
//   let res;

//   try{
//     res =  await api.post("/upload", data)
//   } catch(error) {
//     dispatch(uploadFail(error))
//   }
  
//   console.log('====================================');
//   console.log(res);
//   console.log('====================================');
//   //dispatch(uploadSuccess(response));

//   // return dispatch => {
//   //   axios
//   //     .post("/upload", data)
//   //     .then(response => dispatch(uploadSuccess(response)))
//   //     .catch(error => dispatch(uploadFail(error)));
//   // };
// };

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
