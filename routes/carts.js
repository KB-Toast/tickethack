var express = require('express');
var router = express.Router();

const Cart = require('../models/carts');

// CRUD

// CREATE
router.post('/new', (req, res) => {
  let userId;
  if (!req.body.userId || req.body.userId === undefined) {
    userId = '65b8f89debf5988b2efd772b';
    // defaults to "bob lebrave" userId
  } else {
    userId = req.body.userId;
  }

  const newCart = new Cart({
    userId,
    tripId: req.body.tripId,
    paid: false,
  });

  newCart.save().then(() => res.json({ result: true }));
});

// READ
// get all items in cart for userId
router.post('/getCart', (req, res) => {
  let userId;
  if (!req.body.userId || req.body.userId === undefined) {
    userId = '65b8f89debf5988b2efd772b';
    // defaults to "bob lebrave" userId
  } else {
    userId = req.body.userId;
  }

  Cart.find({ userId, paid: false }).then((userCarts) =>
    res.json({ result: true, userCarts })
  );
});

// get all items in booking for userId
router.post('/getBooking', (req, res) => {
  let userId;
  if (!req.body.userId || req.body.userId === undefined) {
    userId = '65b8f89debf5988b2efd772b';
    // defaults to "bob lebrave" userId
  } else {
    userId = req.body.userId;
  }
  Cart.find({ userId, paid: true }).then((userBookings) =>
    res.json({ result: true, userBookings })
  );
});

// UPDATE
// change trip status to the current opposite, "cart" or "booking"
router.put('/update', (req, res) => {
  const tripId = req.body.tripId;

  let userId;
  if (!req.body.userId || req.body.userId === undefined) {
    userId = '65b8f89debf5988b2efd772b';
    // defaults to "bob lebrave" userId
  } else {
    userId = req.body.userId;
  }

  Cart.findOne({ userId, tripId }).then((cartFound) => {
    if (!cartFound) {
      return res.json({ result: false, error: 'Trip not found' });
    } else {
      console.log(cartFound);
      Cart.updateOne({ userId, tripId }, { paid: !cartFound.paid }).then(
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
  let userId;
  if (!req.body.userId || req.body.userId === undefined) {
    userId = '65b8f89debf5988b2efd772b';
    // defaults to "bob lebrave" userId
  } else {
    userId = req.body.userId;
  }

  Cart.findOne({ userId, tripId }).then((cartFound) => {
    if (!cartFound) {
      return res.json({ result: false, error: 'cart not found' });
    } else {
      Cart.deleteOne({ userId, tripId }).then((cartDeleted) => {
        return res.json({ result: true, cartDeleted });
      });
    }
  });
});

module.exports = router;
