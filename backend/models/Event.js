const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    location: { type: String },
    registStart: { type: Date },
    registEnd: { type: Date },
    eventDate: { type: Date },
    imageURL: { type: String }
});

module.exports = mongoose.model('Event', EventSchema);