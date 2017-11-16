import { FETCH_CURRENT_USER, FETCH_TASKS, CREATE_TASK } from "./types";

export const fetchTasks = () => async (dispatch, getState, api) => {
  const res = await api.get("/tasks");
  dispatch({
    type: FETCH_TASKS,
    payload: res
  });
};

export const createTask = (task) => async (dispatch, getState, api) => {
  console.log(task)
  //const res = await api.post("/create_task", task);

  // dispatch({
  //   type: CREATE_TASK,
  //   payload: res
  // });
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
