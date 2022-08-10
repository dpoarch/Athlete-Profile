const express = require("express");
const route = express.Router();
const Athlete = require('../models/Athlete.js');

route.get('/atheletes', async (req, res) => {
  var atheletes = await Athlete.find({});
  return res.json(atheletes);
});


module.exports = route;