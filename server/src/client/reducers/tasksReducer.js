import { FETCH_TASKS, CREATE_TASK, DELETE_TASK } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    case CREATE_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
};
