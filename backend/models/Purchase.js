const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    userID: { type: String },
    userName: { type: String },
    pNo: { type: Number },
    email: { type: String },
    eventID: { type: String },
    eventName: { type: String },
    location: { type: String },
    eventDate: { type: Date },
    ticketAmount: { type: Number },
    ticketPrice: { type: Number },
    purchaseDate: { type: Number }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);