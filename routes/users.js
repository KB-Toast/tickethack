var express = require('express');
var router = express.Router();

const User = require('../models/users');

const { checkBody } = require('../modules/checkBody'); // Require un module (if needed)

// CRUD

// CREATE
router.post('/new', (req, res) => {
  const { firstname, lastname, email, password } = req.body; // Désctructuration

  const newUser = new User({
    firstname,
    lastname,
    email,
    password,
  });

  newUser.save().then(() => res.json({ result: true }));
});

// READ
router.get('/all', (req, res) => {
  User.find().then((allUsers) => res.json({ result: true, allUsers }));
});

// UPDATE
/*
router.put('/update', (req, res) => {
  const { email, firstname } = req.body;

  User.findOne({ email }).then((userFound) => {
    if (!userFound) {
      return res.json({ result: false, error: 'User not found' });
    } else {
      User.updateOne({ email }, { firstname: firstname }).then(
        (userUpdated) => {
          return res.json({ result: true, updatedUser });
        }
      );
    }
  });
});

// DELETE
router.delete('/delete', (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((userFound) => {
    if (!userFound) {
      return res.json({ result: false, error: 'User not found' });
    } else {
      User.deleteOne({ email }).then((userDeleted) => {
        return res.json({ result: true, deletedUser });
      });
    }
  });
});
*/

module.exports = router;
