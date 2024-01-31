var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');

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

// READ, SEARCH FOR TRIP BY DEPARTURE ARRIVAL AND DATE
router.post('/search', (req, res) => {
  let searchDate = new Date(req.body.date);
  let nextDayTimestamp = searchDate.getTime();
  // 86400000 = 1 jour en millisecondes
  nextDayTimestamp += 86400000;
  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, 'i') },
    arrival: { $regex: new RegExp(req.body.arrival, 'i') },
    date: { $gte: req.body.date, $lte: nextDayTimestamp },
  }).then((trips) => {
    res.json({ trips });
  });
});

// READ, SEARCH FOR TRIP BY ID
router.get('/search/:id', (req, res) => {
  Trip.findById(req.params.id).then((trip) => {
    console.log(trip);
    res.json({ trip });
  });
});

module.exports = router;
