const mongoose = require('mongoose');

const cartsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // link user to bookedtrips, in array form
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' }, // link user to bookedtrips, in array form
  paid: Boolean,
});

const Cart = mongoose.model('carts', cartsSchema);

module.exports = Cart;
