const express = require("express");
const { validationResult } = require('express-validator');

// Validator Schema
const validate_create_profile_schema = require('../schema/validateCreateProfile');
const validate_update_profile_schema = require('../schema/validateUpdateProfile');

// Athlete Model
const Athlete = require('../models/Athlete.js');

const route = express.Router();

/* Get Athletes Profile */
route.get('/athletes', async (req, res) => {
  var _atheletes = await Athlete.find({});
  return res.json(_atheletes);
});

/* Create Athelete Profile */
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
route.post('/createProfile', validate_create_profile_schema, async (req, res) => {
  
  var checkValidate = validationResult(req);

  if (!checkValidate.isEmpty()) {
      var err = checkValidate.array().map(res => res.msg);
      return res.status(400).json({ message: err });
  }

  await Athlete.create(req.body);

  var _atheleteProfiles = await Athlete.find({});
  return res.json(_atheleteProfiles);
});

/* Update Athelete Profile */
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
route.put('/athletesProfile', validate_update_profile_schema, async (req, res) => {
 
    var checkValidate = validationResult(req);

    if (!checkValidate.isEmpty()) {
        const err = checkValidate.array().map(res => res.msg);

        return res.status(400).json({ message: err });
    }

  await Athlete.updateOne({'_id': req.body._id}, req.body);

  var _atheleteProfiles = await Athlete.find({});
  return res.json(_atheleteProfiles);
});


module.exports = route;