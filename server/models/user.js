const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String },
  following: { type: Array }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
