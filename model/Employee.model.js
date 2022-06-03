const mongoose = require('mongoose');

const employSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    avatar: {
        type: String
    },
});

module.exports = mongoose.model('Employee', employSchema);