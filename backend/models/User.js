const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    type: { type: Number },
    pNo: { type: Number },
    email: { type: String },
});

module.exports = mongoose.model('User', UserSchema);