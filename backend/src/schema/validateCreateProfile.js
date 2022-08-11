const { body } = require('express-validator');

const validate_create_profile_schema = [
    body('name')
        .isLength({ max: 128 })
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "Name"'),
    body('birthdate')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "birthdate"'),
    body('location')
         .isLength({ max: 500 })
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "Location"'),
    body('gender')
        .isLength({ max: 6 })
        .exists({ checkNull: true })
        .withMessage('Must contain a parameter of "Gender"'),
    body('sports')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "Sports"'),
    body('about')
         .isLength({ max: 2000 })
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "about"'),
    body('interests')
        .isLength({ max: 255 })
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Must contain a parameter of "interests"'),             
  ];

module.exports = validate_create_profile_schema;