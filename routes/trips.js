var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');

// const { checkBody } = require('../modules/checkBody'); // Require un module (if needed)

// CRUD

// CREATE
router.post('/new', (req, res) => {
  const { departure, arrival, date, price } = req.body; // Désctructuration

  const newTrip = new Trip({
    departure,
    arrival,
    date,
    price,
  });

  newTrip.save().then(() => res.json({ result: true }));
});

// READ
router.get('/all', (req, res) => {
  Trip.find().then((allTrips) => res.json({ result: true, allTrips }));
});

// TODO :
// searchTraject :
// findtraject based on departure, arrival and date

// UPDATE
// not needed ?
/*
router.put('/update', (req, res) => {
  const { email, firstname } = req.body;

  Trip.findOne({ email }).then((tripFound) => {
    if (!tripFound) {
      return res.json({ result: false, error: 'trip not found' });
    } else {
      Trip.updateOne({ email }, { firstname: firstname }).then(
        (tripUpdated) => {
          return res.json({ result: true, updatedTrip });
        }
      );
    }
  });
});
*/

// DELETE
// not needed ?
/*
router.delete('/delete', (req, res) => {
  const { email } = req.body;

  Trip.findOne({ email }).then((tripFound) => {
    if (!tripFound) {
      return res.json({ result: false, error: 'booking not found' });
    } else {
      Trip.deleteOne({ email }).then((tripDeleted) => {
        return res.json({ result: true, deletedTrip });
      });
    }
  });
});
*/

module.exports = router;
