const mongoose = require('mongoose');

const Athlete_Model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    sports: {
        type: Array,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: false
    }
});

const Athlete = mongoose.model('Profiles', Athlete_Model);

module.exports = Athlete;