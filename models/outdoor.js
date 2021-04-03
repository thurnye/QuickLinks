const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const outdoorSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    type: String,
    maxspots: Number,
    // 1:M relations ///an event has many attendants.
    Attendant: [{
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }],
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Outdoor', outdoorSchema)