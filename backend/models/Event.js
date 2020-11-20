const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    location: { type: String },
    eventDate: { type: Date },
    imageURL: { type: String },
    price: { type: Number },
    updatedOn: { type: Date },
    updatedBy: { type: String },
    deleteFlag: { type: Boolean }
});

module.exports = mongoose.model('Event', EventSchema);