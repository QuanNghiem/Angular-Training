const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    type: { type: Number },
    pNo: { type: Number },
    email: { type: String },
    updatedOn: { type: Date },
    updatedBy: { type: String },
    deleteFlag: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);