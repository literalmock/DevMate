const Router = require("express").Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { profileEditSchema } = require("../helpers/validation");

Router.get("/view", auth, async (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Profile data accessed", user: req.user });
  //return user Profile data
});

Router.patch("/edit", auth, async (req, res) => {
  const user = req.user;
  const { name, phoneno, skills, age, gender, about, photoUrl } = req.body;
  const validate = profileEditSchema.safeParse({
    name,
    phoneno,
    skills,
    age,
    gender,
    about,
    photoUrl,
  });
  if (!validate.success) {
    return res.status(400).send("Invalid Credentials");
  }
  // phonenoRegex = /^[6-9]\d{9}$/;
  // if(!phonenoRegex.test(phoneno)){
  //     return res.status(400).send("Enter valid Phone Number")
  // }
  try {
      const curruser = await User.findByIdAndUpdate(
          user._id,
          {
              name: name,
              phoneno: phoneno,
              skills: skills,
              age: age,
              gender: gender,
              about: about,
              photoUrl: photoUrl,
            },
            { new: true }
        );
        if (!curruser) {
            res.status(404).send("Request failed");
        }
        res.json({"message": "Data Successfully updated", "field" : validate.data})
  } catch (err) {
    console.log(err);
    res.send("Some issue with provided data");
  }
});

Router.patch("/password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = req.user;
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
