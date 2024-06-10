const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  category: { type: String, maxlength: 20 },
  isCompleted: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
