const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "vedic_secret_key";

module.exports = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    // check header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    // check format Bearer TOKEN
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid token format"
      });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // attach user info
    req.user = decoded;

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};