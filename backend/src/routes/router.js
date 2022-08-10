const express = require("express");
const route = express.Router();
const Athlete = require('../models/Athlete.js');

route.get('/athletes', async (req, res) => {
  var _atheletes = await Athlete.find({});
  return res.json(_atheletes);
});

/* Create Athelete Profile */
route.post('/createProfile', async (req, res) => {
  /* [POST] Body Request
    "name": "",
    "birthdate": "",
    "location": "",
    "team": "",
    "gender": "",
    "sports": [""],
    "about": "",
    "interests": "",
    "profileImg": ""
  */
  await Athlete.create(req.body);

  var _atheleteProfiles = await Athlete.find({});
  return res.json(_atheleteProfiles);
});

/* Update Athelete Profile */
route.put('/athletesProfile', async (req, res) => {
  /* [PUT] Body Request
    "name": "",
    "birthdate": "",
    "location": "",
    "team": "",
    "gender": "",
    "sports": [""],
    "about": "",
    "interests": "",
    "profileImg": ""
  */
  await Athlete.updateOne({'_id': req.body._id}, req.body);

  var _atheleteProfiles = await Athlete.find({});
  return res.json(_atheleteProfiles);
});


module.exports = route;