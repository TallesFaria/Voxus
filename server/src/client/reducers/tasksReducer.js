import { FETCH_TASKS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS:
      const tasks = action.payload.data;
      return { ...state, data: tasks };
    default:
      return state;
  }
};
