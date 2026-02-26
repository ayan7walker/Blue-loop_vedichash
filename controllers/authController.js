


const User = require("../models/user");
const hashPipeline = require("../utils/hashPipeline");
const jwt = require("jsonwebtoken");

// DO NOT cache at top — read fresh from env
function getJWTSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in environment variables");
  }
  return process.env.JWT_SECRET;
}


// ==============================
// REGISTER
// ==============================
exports.register = async (req, res) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const password_hash = hashPipeline(password);

    const user = new User({
      username,
      password_hash
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};


// ==============================
// LOGIN
// ==============================
exports.login = async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const password_hash = hashPipeline(password);

    if (user.password_hash !== password_hash) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // ✅ FIX: read secret at runtime
    const secret = getJWTSecret();

    const token = jwt.sign(
      {
        id: user._id.toString(),
        username: user.username
      },
      secret,
      {
        expiresIn: "24h"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// ==============================
// GET PROFILE
// ==============================
exports.getProfile = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};