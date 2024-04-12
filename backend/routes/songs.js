const mongoose = require('mongoose');

// Schema for individual songs
const SongSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId , ref :"User"
  },

}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Create the model from the schema
const Song = mongoose.model('Songs', SongSchema);

module.exports = Song;
