const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: String,
  progress: Number,
  deadline: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group', 
  },
});

module.exports = mongoose.model('Goal', goalSchema);