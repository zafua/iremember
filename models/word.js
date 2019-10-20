const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const wordSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Word', wordSchema);