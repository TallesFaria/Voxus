import { FETCH_CURRENT_USER, FETCH_TASKS } from "./types";

export const fetchTasks = () => async (dispatch, getState, api) => {
  const res = await api.get("/tasks");

  dispatch({
    type: FETCH_TASKS,
    payload: res
  });
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
