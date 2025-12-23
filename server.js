const auth = require('./middleware/auth');
const mongoose = require('./config/database');
const apicall = require('./app.js');

// app.get('/status', auth , (req, res) => {
//   res.send('Server is running');
// })
// app.get('/status/v1/', (req, res) => {
//   throw new Error('Simulated server error'); 
// })
// app.get('/login', (req, res) => {
//   const currentTime = new Date().toISOString();
//   res.send(currentTime);
// })


// app.get('/', (err,req, res,next) => {
//   res.send('Hello World');
//    if (err) {
//       res.status(500).send('Internal Server Error');
//    } 
// })