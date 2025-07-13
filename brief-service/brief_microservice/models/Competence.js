// This model is only for Mongoose population/reference in Brief-Service.
const mongoose = require('mongoose');

const competenceSchema = new mongoose.Schema({
    // Only include fields needed for population, or leave empty if not used
}, { strict: false }); // Allow any fields for population

module.exports = mongoose.model('Competence', competenceSchema); 