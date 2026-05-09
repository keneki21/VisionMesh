const mongoose = require('mongoose');

const evaluationHistorySchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  filename:      { type: String, required: true },
  score:         { type: Number, required: true },
  grade:         { type: String, required: true },
  report:        { type: mongoose.Schema.Types.Mixed, required: true },
  imageData:     { type: Buffer },
  imageMimeType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('EvaluationHistory', evaluationHistorySchema);

