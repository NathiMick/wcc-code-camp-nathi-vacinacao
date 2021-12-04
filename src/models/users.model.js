const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        
    },
    createdIn: {
        type: Date,
        required: true,
        default: new Date
    },
    vaccines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vaccines',
        required: true,
    }],


})

module.exports = mongoose.model('users', userSchema);