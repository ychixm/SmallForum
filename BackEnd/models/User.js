const mongoose = require('mongoose');
const uniqueValidator =require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  password: { type: String, required: true },
  _id: { type: String, required: false },
  name : { type: String, required: true, unique: true }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);