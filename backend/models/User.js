const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    // email: { type: String },
    // pNo: { type: Number },
    type: { type: Number },
    eventRegistered: []
});

module.exports = mongoose.model('User', UserSchema);