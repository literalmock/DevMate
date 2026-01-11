const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connection established');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = mongoose;