const mongoose = require('mongoose');

const briefSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    competences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competence',
    }],
    apprenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apprenant',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Brief', briefSchema);