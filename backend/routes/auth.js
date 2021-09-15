const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser')

const JWT_SECREAT = "MyNameisSID";

//Create a new user
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Enter a Valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already in use" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECREAT);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

//Auth a user login
router.post(
  "/login",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("password", "It cannot be blanck").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Crendiatials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Wrong Crendiatials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECREAT);
      res.json({ authtoken });
    } catch (error) {
      res.status(500).send("Some Error occured");
    }
  }
);

//Get user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Some Error occured");
  }
});

module.exports = router;
