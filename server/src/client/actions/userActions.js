import axios from "axios";
import {
  FETCH_CURRENT_USER,
  FETCH_TASKS,
  FETCH_TASK,
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
  const tasksList = [];
  res.data.hits.map(task =>
    tasksList.push({
      name: task._source.name || "",
      description: task._source.description || "",
      priority: task._source.priority || 0,
      submittedByUser: task._source.submittedByUser || "",
      done: task._source.done || false,
      files: task._source.files || [],
      id: task._id
    })
  );
  console.log("================list of tasks================");
  console.log(tasksList);
  console.log("====================================");
  dispatch({
    type: FETCH_TASKS,
    payload: tasksList
  });
};

export const fetchTask = id => async (dispatch, getState, api) => {
  const { data } = await api.post("/fetch-task", { id });

  const task = {
    name: data._source.name || "",
    description: data._source.description || "",
    priority: data._source.priority || 0,
    submittedByUser: data._source.submittedByUser || "",
    done: data._source.done || false,
    files: data._source.files || [],
    id
  };

  dispatch({
    type: FETCH_TASK,
    payload: task
  });
};

export const createTask = task => async (dispatch, getState, api) => {
  const res = await api.post("/new-task", {
    ...task
  });

  console.log("==============CREATE==================");
  console.log(res);
  console.log("====================================");

  const addedTask = {
    name: task.taskName || "",
    description: task.description || "",
    priority: task.priority || 0,
    createdBy: task.createBy || "",
    done: task.done || false,
    files: task.files || [],
    id: res.data._id
  };
  dispatch({
    type: CREATE_TASK,
    payload: addedTask
  });
};

export const deleteTask = (index, id) => async (dispatch, getState, api) => {
  console.log(index);
  const res = await api.post("/delete", { id });

  dispatch({
    type: DELETE_TASK,
    payload: index
  });
};

export const updateTask = data => async (dispatch, getState, api) => {
  await api.post("/update-task", data);

  const task = {
    name: data.taskName || "",
    description: data.description || "",
    priority: data.priority || 0,
    done: false,
    id: data.id
  };

  dispatch({
    type: UPDATE_TASK,
    payload: task
  });
};

export const isDone = (index, done, id, auth) => async (
  dispatch,
  getState,
  api
) => {
  console.log(index);
  await api.post("/done", { done: !done, id, doneBy: auth });

  dispatch({
    type: DONE,
    payload: index,
    done
  });
};

export const uploadDocumentRequest = ({ file, name, id }) => async (
  dispatch,
  getState,
  api
) => {
  let data = new FormData();
  data.append("file", document);
  data.append("name", name);
  data.append("id", id);
  let res;

  try {
    res = await api.post("/upload", data);
    console.log("====================================");
    console.log(res);
    console.log("====================================");
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
  console.log("=============ACTION USER=====================");
  let res;
  try {
    res = await api.get("/current_user");
  } catch (err) {
    console.log("===========ERROR IN LOG IN======================");
    console.log(err);
    console.log("====================================");
  }
  console.log(res);
  console.log("====================================");
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
