const User = require("../models/user");
const hashPipeline = require("../utils/hashPipeline");


// ==============================
// REGISTER
// ==============================
exports.register = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing"
      });
    }

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
      message: "User registered successfully",
      hash: password_hash
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

    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing"
      });
    }

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

    // ✅ CREATE JWT TOKEN
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "vedic_secret_key",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};


// ==============================
// GET PROFILE (FIXED)
// ==============================
exports.getProfile = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const user = await User.findById(req.user.id).select("-password_hash");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }

};

