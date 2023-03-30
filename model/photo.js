const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  str: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;