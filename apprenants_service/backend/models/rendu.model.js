import mongoose from 'mongoose';

const renduSchema = new mongoose.Schema(
  {
    apprenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apprenant',
      required: true,
    },
    brief: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Rendu', renduSchema);
