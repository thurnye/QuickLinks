const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    // a user can belong to many events. 
    upcoming: [{
      event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Outdoor'
      }
    }]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema)