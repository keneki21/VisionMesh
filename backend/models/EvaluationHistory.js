const mongoose = require('mongoose');

const evaluationHistorySchema = new mongoose.Schema({
  filename:      { type: String, required: true },
  score:         { type: Number, required: true },
  grade:         { type: String, required: true },
  report:        { type: mongoose.Schema.Types.Mixed, required: true },
  imageData:     { type: Buffer },  // Store as binary, not base64
  imageMimeType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('EvaluationHistory', evaluationHistorySchema);

