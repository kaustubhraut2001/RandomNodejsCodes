const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    _id: { type: Number, required: true },
    first_name: { type: String, required: true },
    first_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    ip_address: { type: String }


}, { timestamps: true });

module.exports = mongoose.model('User', userschema);