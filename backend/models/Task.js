import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;