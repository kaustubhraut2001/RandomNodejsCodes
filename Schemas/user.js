const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

    firsname: { type: String, required: true },
    lastname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String },


}, { timestamps: true });

module.exports = mongoose.model('User', userschema);