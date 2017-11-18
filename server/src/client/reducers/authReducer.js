import { FETCH_CURRENT_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      console.log("===========AUTH REDUCER======================");
      console.log(action);
      console.log("====================================");
      return [...state, action.payload.data || false];
    default:
      return state;
  }
}
