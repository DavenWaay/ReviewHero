const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, sparse: true, unique: true }, // Optional but unique if provided
  passwordHash: { type: String }, // Not needed for Firebase users
  quizzesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
  quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
}, { timestamps: true });

// Create indexes
UserSchema.index({ username: 1 }, { unique: true, sparse: true }); // Allow multiple null values

module.exports = mongoose.model('User', UserSchema);
