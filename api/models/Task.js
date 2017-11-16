const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  id: String,
  name: String,
  description: String, 
  anexos: Array,
  priority: Number,
  submittedByUser: String,
  done: Boolean
});

mongoose.model('tasks', taskSchema);
