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
    purchaseDate: { type: Number },
    updatedOn: { type: Date },
    updatedBy: { type: String },
    deleteFlag: { type: Boolean }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);