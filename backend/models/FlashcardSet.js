const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  term: { type: String, required: true },
  definition: { type: String, required: true },
});

const FlashcardSetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  cards: [CardSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FlashcardSet', FlashcardSetSchema);
