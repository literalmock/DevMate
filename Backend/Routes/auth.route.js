const express = require('express');
const Router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const {signup,login,logout} = require('../controller/auth.controller.js');
const auth = require('../middleware/auth.js');

Router.post('/signup', signup);
Router.post('/login', login);
Router.post('/logout', logout);


module.exports = Router;