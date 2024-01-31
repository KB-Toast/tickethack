var express = require('express');
var router = express.Router();

const Cart = require('../models/carts');

// CRUD

// CREATE
router.post('/new', (req, res) => {
  const newCart = new Cart({
    tripId: req.body.tripId,
    paid: false,
  });

  newCart.save().then(() => res.json({ result: true }));
});

// READ
// get all items in cart
router.get('/getCart', (req, res) => {
  Cart.find({ paid: false }).then((userCarts) =>
    res.json({ result: true, userCarts })
  );
});

// get all items in booking for userId
router.get('/getBooking', (req, res) => {
  Cart.find({ paid: true }).then((userBookings) =>
    res.json({ result: true, userBookings })
  );
});

// UPDATE
// change trip status to the current opposite, "cart" or "booking"
router.put('/update', (req, res) => {
  const tripId = req.body.tripId;

  Cart.findOne({ tripId }).then((cartFound) => {
    if (!cartFound) {
      return res.json({ result: false, error: 'Trip not found' });
    } else {
      console.log(cartFound);
      Cart.updateOne({ tripId }, { paid: !cartFound.paid }).then(
        (userUpdated) => {
          return res.json({ result: true, userUpdated });
        }
      );
    }
  });
});

// DELETE
// remove trip from cart and/or booking
router.delete('/delete', (req, res) => {
  const tripId = req.body.tripId;

  Cart.findOne({ tripId }).then((cartFound) => {
    if (!cartFound) {
      return res.json({ result: false, error: 'cart not found' });
    } else {
      Cart.deleteOne({ tripId }).then((cartDeleted) => {
        return res.json({ result: true, cartDeleted });
      });
    }
  });
});

module.exports = router;
