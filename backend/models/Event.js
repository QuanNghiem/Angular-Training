const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    location: { type: String },
    eventDate: { type: Date },
    imageURL: { type: String },
    price: { type: Number }
});

module.exports = mongoose.model('Event', EventSchema);