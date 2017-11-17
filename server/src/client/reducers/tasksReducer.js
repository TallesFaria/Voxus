import {
  FETCH_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  DONE,
  UPDATE_TASK
} from '../actions/types';

export default (state = [], action) => {
  let index;
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
    case DONE:
      return [
        ...state.slice(0, action.payload),
        { ...state.slice(action.payload, action.payload), done: !action.done },
        ...state.slice(action.payload + 1)
      ];
    case UPDATE_TASK:
      index = state.findIndex(element => element.id === action.payload.id);
      return [
        ...state.slice(0, index),
        { ...action.payload, ...state.slice(index, index) },
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};
