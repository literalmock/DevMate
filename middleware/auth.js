const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  const {token} = req.cookies;
  if (!token){
    return res.status(400).send("Invalid token")
  }
  const decoded = await jwt.verify(token, 'my-secret')
  const user = await User.findById(decoded._id)
  if (!user){
    return res.status(400).send("Invalid User")
  }
  req.user = user;
  next();
};

module.exports = auth;