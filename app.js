const User = require('./models/user');
const express = require('express');
const app = express();
const mongoose = require('./config/database');
const auth = require('./middleware/auth');
const authRoutes = require('./Routes/Auth.route');
const profRoutes = require('./Routes/profile.route')
const cookieParser = require('cookie-parser');
const reqRoutes = require("./Routes/request.route")
app.use(express.json());
app.use(cookieParser());

// Signup and Login Routes(API Gateway)
app.use('/auth', authRoutes); 
app.use('/profile', profRoutes); 
app.use('/request', reqRoutes); 





// app.get('/weather/:city', (req, res) => {
//   fetch('https://wttr.in/' + req.params.city)
//   .then(response => response.text())
//   .then(data => {
//     res.send(data);
//   })
//   .catch(error => {
//     res.status(500).send('Error fetching weather data');
//   });
// })

port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
})