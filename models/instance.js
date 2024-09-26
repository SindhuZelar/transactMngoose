const mongoose = require('mongoose');

const instanceSchema = new mongoose.Schema(
  {
    instanceId: { type: String, required: true, unique: true },
    bonusId: { type: String, required: true },
    player: { type: String, required: true },
    count: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'pending', 'accepted', 'rejected', 'canceled'],
      default: 'pending',
    },
    lockId: { type: String, default: null }, // Lock ID for document-level locking
    startTime: { type: Date },
    endTime: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Instance', instanceSchema);
