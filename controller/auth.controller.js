const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name,username, password, email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Enter a valid email");
    }
    if (!password) {
      return res.status(400).send("Invalid password");
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const login = async (req, res) => {
  //Write and check for userdata provided
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Enter a valid email");
  }
  if (!password) {
    return res.status(400).send("Invalid password");
  }
  try {
    //User exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Does not exist" });
    }
    //use bcrypt to compare password
    const userdetail = await User.findOne({ email: email });
    const auth = await bcrypt.compare(password, userdetail.password);
    if (!auth) {
      return res.status(401).send("Password is Wrong");
    }
    // jwt authorization
    const token = await jwt.sign({ _id: userdetail._id }, "my-secret");
    res.cookie("token" , token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return res.status(200).send("login Successful");
  } catch (err) {
    console.log(err);
    return res.status(500).send("some error occured");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).send("Logged out successfully");
}
module.exports = { signup, login , logout };
