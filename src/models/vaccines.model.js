const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    expected_date: {
        type: Date
    },
    vaccinated: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('vaccines', vaccineSchema);