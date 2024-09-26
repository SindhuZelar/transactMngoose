const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema(
  {
    bonusId: { type: String, required: true, unique: true },
    gameId: [{ type: String, required: true }],
    currency: { type: String, required: true },
    count: { type: Number, default: 0 },
    value: { type: String, required: true },
    type: { type: String, required: true, enum: ['free_bets', 'bonus_game'] },
    operatorId: { type: String, required: true },
    duration: { type: Number },
    players: [{ type: String, required: true }],
    playerInstances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instance', required: true }],
    startTime: { type: Date },
    status: {
      type: String,
      enum: ['active', 'pending', 'finished', 'canceled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bonus', bonusSchema);
