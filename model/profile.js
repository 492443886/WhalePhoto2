const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        required: false,
        default: ''
    },
    location: {
        type: String,
        required: false,
        default: ''
    },
    hobby: {
        type: String,
        required: false,
        default: ''
    },
    food: {
        type: String,
        required: false,
        default: ''
    },
    birth_year: {
        type: Number,
        required: false,
        default: 0
    }
});

const Photo = mongoose.model('Profile', profileSchema);
module.exports = Photo;