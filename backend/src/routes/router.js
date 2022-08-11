const express = require("express");
const { validationResult, check } = require('express-validator');
const route = express.Router();
const Athlete = require('../models/Athlete.js');

var postRequestVal = [
  check('name')
      .isLength({ max: 128 })
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "Name"'),
  check('birthdate')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "birthdate"'),
  check('location')
       .isLength({ max: 500 })
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "Location"'),
  check('gender')
      .isLength({ max: 6 })
      .exists({ checkNull: true })
      .withMessage('Must contain a parameter of "Gender"'),
  check('sports')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "Sports"'),
  check('about')
       .isLength({ max: 2000 })
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "about"'),
  check('interests')
      .isLength({ max: 255 })
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Must contain a parameter of "interests"'),             
];


var putRequestVal = [
  ...postRequestVal, 
    check('_id')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Must contain a parameter of "_id"')
]

route.get('/athletes', async (req, res) => {
  var _atheletes = await Athlete.find({});
  return res.json(_atheletes);
});

/* Create Athelete Profile */
route.post('/createProfile', postRequestVal, async (req, res) => {
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
route.put('/athletesProfile', putRequestVal, async (req, res) => {
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