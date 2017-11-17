import { FETCH_TASK } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_TASK:
    console.log('=============TASK====================')
    console.log(action.payload);
    console.log('====================================')
      return action.payload;
    default:
      return state;
  }
};
