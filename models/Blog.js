const mongoose = require('mongoose');
const connection = require('../libs/connection');

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    media: {
        type: String,
    },
}, {
    timestamps: true,
});


module.exports = connection.model('Blog', blogSchema);