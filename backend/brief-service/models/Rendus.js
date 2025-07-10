const mongoose = require('mongoose');

const renduSchema = new mongoose.Schema({
  apprenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apprenant',
    required: true
  },
  briefId: {
    type: String,
    required: true
  },
  submission: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'approved', 'rejected'],
    default: 'submitted'
  },
  feedback: {
    type: String
  },
  grade: {
    type: Number,
    min: 0,
    max: 100
  },
  reviewedBy: {
    type: String
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rendu', renduSchema);