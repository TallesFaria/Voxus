import { FETCH_TASKS, CREATE_TASK } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS:
      const tasks = action.payload;
      return { ...state, data: tasks };
    default:
      return state;
  }
};
