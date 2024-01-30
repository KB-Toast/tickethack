const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  bookingTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }], // link user to bookedtrips, in array form
  cartTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }], // link user to bookedtrips, in array form
});

const User = mongoose.model('users', userSchema);

module.exports = User;
