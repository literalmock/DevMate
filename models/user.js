const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  // 🔹 Basic identity
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  phoneno: {
    type: String,
    match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]
  },

  // 🔹 Profile info
  age: {
    type: Number,
    min: 18,
    max: 100
  },

  gender: {
    type: String,
    enum: ["male", "female", "non-binary", "other"],
  },

  photoURL: {
    type: String, // Cloudinary / S3 / image URL
  },

  about: {
    type: String,
    maxlength: 300,
    trim: true
  },

  skills: {
    type: Array, // ["React", "Node", "MongoDB"]
  },

  // 🔹 App meta
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;