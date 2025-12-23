const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type:String},
    username: { type: String, required: true, unique: true },   
    password: { type: String, required: true },
    email: { type: String, required: true  },
    createdAt: { type: Date, default: Date.now },
    phoneno: {type: String,match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]}
});
const User = mongoose.model('User', userSchema);
module.exports = User;