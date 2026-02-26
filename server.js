const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const hashRoutes = require("./routes/hashRoutes");
dotenv.config();

// connect database
connectDB();

const app = express();

// IMPORTANT middleware
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");

app.use("/api", authRoutes);
app.use("/api/hash", hashRoutes);
// test route
app.get("/", (req, res) => {
  res.send("Vedic Hash API Running");
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
