import {
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL
} from '../actions/types';

export default (state = 'null', action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT_SUCCESS:
    case UPLOAD_DOCUMENT_FAIL:
      return action;
    default:
      return state;
  }
};
