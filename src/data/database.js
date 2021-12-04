require('dotenv').config();
const mongoose = require('mongoose');

const optionsEnv = process.env.DATABASE_URL || process.env.DATABASE_URL_DEV;

const connect = () => {
    mongoose.connect(optionsEnv, {
        useNewUrlParser: true,
        useUnifiedtopology: true
    })
    .then(console.log(`Database connected at port ${optionsEnv}`))
    .catch(error => {
        message: 'Database not connected'
    
    })
}

module.exports = { connect }