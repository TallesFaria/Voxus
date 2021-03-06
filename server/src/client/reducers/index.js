import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tasksReducer from './tasksReducer';
import taskReducer from './taskReducer';
import authReducer from './authReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  form: formReducer,
  upload: uploadReducer,
  task: taskReducer
});
