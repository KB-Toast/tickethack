const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

const User = mongoose.model('users', usersSchema);

module.exports = User;
