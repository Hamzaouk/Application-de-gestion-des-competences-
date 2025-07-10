const mongoose = require('mongoose');

const BriefSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  skills: [{ type: String }] // Can be ObjectId ref to Skill model later
}, { timestamps: true });

module.exports = mongoose.model('Brief', BriefSchema);
