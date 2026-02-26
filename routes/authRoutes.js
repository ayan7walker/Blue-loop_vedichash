// const express = require("express");

// const router = express.Router();

// const authController = require("../controllers/authController");

// router.post("/register", authController.register);

// router.post("/login", authController.login);

// module.exports = router;
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");


// register
router.post("/register", authController.register);


// login
router.post("/login", authController.login);


// profile (PROTECTED)
router.get("/profile", authMiddleware, authController.getProfile);


module.exports = router;