const mongoose = require('mongoose');

const ForumPostSchema = mongoose.Schema({
  time: { type: Date, required: true },
  text: { type: String, required: true },
  _id: { type: String, required: false },
  name : { type: String, required: true},
  userId : {type: String, required: true}
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);